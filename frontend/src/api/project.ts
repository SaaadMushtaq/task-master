import API from "./api";

export const createProject = async (project: {
  name: string;
  description: string;
  category: string;
}) => {
  const res = await API.post("/projects", project);
  return res.data;
};

export const getProjects = async () => {
  const res = await API.get("/projects");
  return res.data.projects;
};

export const getProjectById = async (id: string) => {
  const res = await API.get(`/projects/${id}`);
  return res.data.project;
};

export const updateProject = async (
  id: string,
  project: { name: string; description: string; category: string }
) => {
  const res = await API.put(`/projects/${id}`, project);
  return res.data.project;
};

export const deleteProject = async (id: string) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};
