import api from "./axiosInstance";

export const fetchProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const fetchAdminProjects = async () => {
  const res = await api.get("/admin/projects");
  return res.data;
};

export const createProject = async (formData) => {
  const res = await api.post("/admin/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateProject = async (id, formData) => {
  const res = await api.put(`/admin/projects/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/admin/projects/${id}`);
  return res.data;
};
