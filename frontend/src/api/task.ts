import API from "./api";

export const createTask = async (task: {
  title: string;
  status: "todo" | "done" | "in-progress";
  projectId: string;
}) => {
  const res = await API.post("/tasks", task);
  return res.data;
};

export const getTasks = async (projectId: string) => {
  const res = await API.get(`/tasks/${projectId}`);
  return res.data.tasks;
};

export const getTaskById = async (id: string) => {
  const res = await API.get(`/tasks/get-by-id/${id}`);
  return res.data.task;
};

export const updateTask = async (
  id: string,
  task: {
    title: string;
    status: "todo" | "done" | "in-progress";
    position: number;
  }
) => {
  const res = await API.put(`/tasks/${id}`, task);
  return res.data.project;
};

export const deleteTask = async (id: string) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};

export const reorderTask = async (
  taskId: string,
  sourceStatus: "todo" | "in-progress" | "done",
  sourceIndex: number,
  destinationStatus: "todo" | "in-progress" | "done",
  destinationIndex: number
) => {
  const res = await API.put(`/tasks/reorder`, {
    taskId,
    sourceStatus,
    sourceIndex,
    destinationStatus,
    destinationIndex,
  });
  return res.data;
};
