import api from "./axiosInstance";

export const subscribeNewsletter = async (email) => {
  const res = await api.post("/newsletter/subscribe", { email });
  return res.data;
};

export const fetchSubscribers = async () => {
  const res = await api.get("/admin/subscribers");
  return res.data;
};
