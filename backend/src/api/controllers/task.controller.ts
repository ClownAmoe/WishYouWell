import { Request, Response } from "express";
import {
  createTask,
  getTask,
  cancelTask,
  getTasks,
} from "../services/task.service";

export async function createTaskController(req: Request, res: Response) {
  const { cards } = req.body;
  if (!Array.isArray(cards) || cards.length === 0)
    return res.status(400).json({ error: "cards required" });

  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    let workerHeader = req.headers["x-worker-id"];
    if (!workerHeader) {
      return res.status(400).json({ error: "Worker ID missing" });
    }

    const worker = Array.isArray(workerHeader) ? workerHeader[0] : workerHeader;

    const task = await createTask(cards, worker, user._id.toString());

    res.json({ taskId: task._id, worker });
  } catch (err: any) {
    res.status(429).json({ error: err.message });
  }
}

export async function getAllTasks(req: Request, res: Response) {
  const tasks = await getTasks();
  if (!tasks) return res.status(404).json({ error: "Tasks not found" });
  res.json(tasks);
}

export async function getTaskController(req: Request, res: Response) {
  const task = await getTask(req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
}

export async function cancelTaskController(req: Request, res: Response) {
  const success = await cancelTask(req.params.id);
  if (!success) return res.status(400).json({ error: "Cannot cancel task" });
  res.json({ message: "Task cancelled" });
}
