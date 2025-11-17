import api from "./axiosInstance";

export const submitContact = async (payload) => {
  const res = await api.post("/contact", payload);
  return res.data;
};

export const fetchContacts = async () => {
  const res = await api.get("/admin/contacts");
  return res.data;
};
