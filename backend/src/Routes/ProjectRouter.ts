import { Router } from "express";
import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getProjectById,
} from "../Controllers/ProjectController";
import authMiddleware from "../Middlewares/AuthMiddleware";

const router = Router();
router.use(authMiddleware);

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
