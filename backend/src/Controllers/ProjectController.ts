import { Request, Response } from "express";
import ProjectModel from "../Models/Project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, category } = req.body;

    const newProject = await ProjectModel.create({
      name,
      description,
      category,
    });

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find().sort({ updatedAt: -1 });

    res.status(200).json({
      message: "Projects retrieved successfully",
      projects,
    });
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findById(id);

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error("Get Project By ID Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { name, description, category },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updated,
    });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await ProjectModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
