import TaskModel, { TaskDocument } from "../models/task.model";
import { ITask } from "../types/task";
import PQueue from "p-queue";

const queue = new PQueue({ concurrency: 2 });

async function runTask(taskId: string) {
  const task = await TaskModel.findById(taskId);
  if (!task) return;

  try {
    task.status = "in_progress";
    task.progress = 0;
    task.result = [];
    await task.save();

    const totalCards = task.cards.length;

    for (let i = 0; i < totalCards; i++) {
      const cardName = task.cards[i];
      const card = await import("../models/card.model").then((m) =>
        m.default.findOne({ name: cardName })
      );
      const desc = card ? card.desc : `No description for ${cardName}`;
      task.result.push(desc);

      const startProgress = Math.round((i / totalCards) * 100);
      const endProgress = Math.round(((i + 1) / totalCards) * 100);
      const steps = 10;
      const stepDelay = 1000;

      for (let s = 1; s <= steps; s++) {
        task.progress =
          startProgress +
          Math.round(((endProgress - startProgress) * s) / steps);
        await task.save();
        await new Promise((resolve) => setTimeout(resolve, stepDelay));
      }
    }

    task.status = "done";
    task.progress = 100;
    await task.save();
    console.log(`[QUEUE] Task done ${task._id}`);
  } catch (err) {
    task.status = "cancelled";
    await task.save();
    console.log(`[QUEUE] Task cancelled ${task._id}`);
  }
}

export async function createTask(
  cards: string[],
  server: string,
  userId: string
): Promise<TaskDocument> {
  const task = await TaskModel.create({
    cards,
    status: "pending",
    user: userId,
    progress: 0,
    result: [],
    server,
  });

  console.log(`[QUEUE] Task queued ${task._id}`);

  queue.add(() => runTask(task._id.toString()));

  return task;
}

export async function getTask(taskId: string): Promise<ITask | null> {
  return TaskModel.findById(taskId);
}

export async function getTasks(): Promise<ITask[]> {
  return TaskModel.find({});
}

export async function cancelTask(taskId: string): Promise<boolean> {
  const task = await TaskModel.findById(taskId);
  if (!task || task.status === "done" || task.status === "cancelled")
    return false;

  task.status = "cancelled";
  await task.save();
  return true;
}
