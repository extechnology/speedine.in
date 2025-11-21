import axiosInstance from "../api/axiosInstance";

export const registerUser = async (data: {
  username: string;
  identifier: string;
  password: string;
  
}) => {
  const res = await axiosInstance.post("/auth/register/", data);
  return res.data;
};

export const loginUser = async (data: { identifier: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login/", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout/");
  return res.data;
};