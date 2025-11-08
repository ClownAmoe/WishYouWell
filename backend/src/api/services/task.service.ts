import { ITask } from "../types/task";
import TaskModel, { TaskDocument } from "../models/task.model";

const MAX_CONCURRENT_TASKS = 3;
let runningTasks = 0;

export async function createTask(cards: string[]): Promise<TaskDocument> {
  if (runningTasks >= MAX_CONCURRENT_TASKS)
    throw new Error("Too many concurrent tasks");

  const task = await TaskModel.create({ cards });
  runTask(task._id.toString());
  return task;
}

async function runTask(taskId: string) {
  const task = await TaskModel.findById(taskId);
  if (!task) return;

  task.status = "in_progress";
  task.progress = 0;
  await task.save();
  runningTasks++;

  const interval = setInterval(async () => {
    task.progress += 20;
    if (task.progress >= 100) {
      clearInterval(interval);
      task.status = "done";
      task.result = task.cards.map((c) => `Опис карти ${c}`).join("\n");
      runningTasks--;
    }
    await task.save();
  }, 500);
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
