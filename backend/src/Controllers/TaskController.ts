import { Request, Response } from "express";
import TaskModel from "../Models/Task";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, status, projectId } = req.body;
    const count = await TaskModel.countDocuments({ projectId, status });

    const task = await TaskModel.create({
      title,
      status,
      projectId,
      position: count,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const tasks = await TaskModel.find({ projectId }).sort({ position: -1 });
    res.status(200).json({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error("Get Task By ID Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, status, position } = req.body;

    const updated = await TaskModel.findByIdAndUpdate(
      id,
      { title, status, position },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updated,
    });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await TaskModel.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const reorderTask = async (req: Request, res: Response) => {
  const {
    taskId,
    sourceStatus,
    sourceIndex,
    destinationStatus,
    destinationIndex,
  } = req.body;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const projectId = task.projectId;

    const isSameColumn = sourceStatus === destinationStatus;

    if (isSameColumn) {
      if (sourceIndex < destinationIndex) {
        await TaskModel.updateMany(
          {
            projectId,
            status: sourceStatus,
            position: { $gt: sourceIndex, $lte: destinationIndex },
          },
          { $inc: { position: -1 } }
        );
      } else if (sourceIndex > destinationIndex) {
        await TaskModel.updateMany(
          {
            projectId,
            status: sourceStatus,
            position: { $gte: destinationIndex, $lt: sourceIndex },
          },
          { $inc: { position: 1 } }
        );
      }

      task.position = destinationIndex;
      await task.save();
    } else {
      await TaskModel.updateMany(
        {
          projectId,
          status: sourceStatus,
          position: { $gt: sourceIndex },
        },
        { $inc: { position: -1 } }
      );

      await TaskModel.updateMany(
        {
          projectId,
          status: destinationStatus,
          position: { $gte: destinationIndex },
        },
        { $inc: { position: 1 } }
      );

      task.status = destinationStatus;
      task.position = destinationIndex;
      await task.save();
    }

    res.status(200).json({ message: "Task reordered successfully", task });
  } catch (error) {
    console.error("Reorder Task Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
