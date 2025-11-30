import { Router } from "express";
import {
  cancelTaskController,
  createTaskController,
  getAllTasks,
  getTaskController,
} from "../controllers/task.controller";
import taskModel from "../models/task.model";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllTasks);
router.post("/create", createTaskController);
router.get("/:id", getTaskController);
router.post("/:id/cancel", cancelTaskController);

router.delete("/tasks", async (req, res) => {
  await taskModel.deleteMany({});
  res.json({ message: "All tasks removed" });
});

export default router;
