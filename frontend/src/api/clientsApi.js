import api from "./axiosInstance";

export const fetchClients = async () => {
  const res = await api.get("/clients");
  return res.data;
};

export const fetchAdminClients = async () => {
  const res = await api.get("/admin/clients");
  return res.data;
};

export const createClient = async (formData) => {
  const res = await api.post("/admin/clients", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateClient = async (id, formData) => {
  const res = await api.put(`/admin/clients/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteClient = async (id) => {
  const res = await api.delete(`/admin/clients/${id}`);
  return res.data;
};
