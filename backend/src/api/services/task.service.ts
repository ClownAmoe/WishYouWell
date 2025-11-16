import { ITask } from "../types/task";
import TaskModel, { TaskDocument } from "../models/task.model";

const MAX_CONCURRENT_TASKS = 3;
let runningTasks = 0;

export async function createTask(cards: string[]): Promise<TaskDocument> {
  if (runningTasks >= MAX_CONCURRENT_TASKS)
    throw new Error("Too many concurrent tasks");

  const task = await TaskModel.create({
    cards,
    status: "pending",
    progress: 0,
    result: [],
  });
  runTask(task._id.toString());
  return task;
}

async function runTask(taskId: string) {
  const task = await TaskModel.findById(taskId);
  if (!task) return;

  task.status = "in_progress";
  task.progress = 0;
  task.result = [];
  await task.save();
  runningTasks++;

  try {
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
  } catch (err) {
    task.status = "cancelled";
    await task.save();
  } finally {
    runningTasks--;
  }
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
  runningTasks--;
  await task.save();
  return true;
}
