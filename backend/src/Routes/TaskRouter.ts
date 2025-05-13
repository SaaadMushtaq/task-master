import { Router } from "express";
import authMiddleware from "../Middlewares/AuthMiddleware";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  reorderTask,
  updateTask,
} from "../Controllers/TaskController";

const router = Router();
router.use(authMiddleware);

router.put("/reorder", reorderTask);
router.get("/:projectId", getAllTasks);
router.get("/get-by-id/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
