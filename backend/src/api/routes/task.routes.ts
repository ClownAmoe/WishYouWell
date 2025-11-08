import { Router } from "express";
import {
  cancelTaskController,
  createTaskController,
  getAllTasks,
  getTaskController,
} from "../controllers/task.controller";

const router = Router();
router.get("/", getAllTasks);
router.post("/create", createTaskController);
router.get("/:id", getTaskController);
router.post("/:id/cancel", cancelTaskController);

export default router;
