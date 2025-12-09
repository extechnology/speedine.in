import axiosInstance from "./axiosInstance";

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/users/current-user/");
  return res.data;
};
