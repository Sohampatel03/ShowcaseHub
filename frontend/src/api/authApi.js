import api from "./axiosInstance";

export const loginAdmin = async (email, password) => {
  const res = await api.post("/admin/login", { email, password });
  return res.data;
};
