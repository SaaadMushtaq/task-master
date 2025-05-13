export type Project = {
  _id: string;
  name: string;
  category: string;
  updatedAt: string;
};

export type Task = {
  _id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  position: number;
  projectId: string;
};
