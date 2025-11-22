import axiosInstance from "../api/axiosInstance";
import type { Login, Register, VerifyOtp, ResendOtp } from "../types";

export const registerUser = async (data: Register) => {
  const res = await axiosInstance.post("/auth/register/", data);
  return {
    success: true,
    message: res.data?.message,
    data: res.data,
  };
};

export const verifyOtp = async (data: VerifyOtp) => {
  const res = await axiosInstance.post("/auth/verify-otp/", data);
  return res.data;
};

export const ResendOTP = async (data: ResendOtp) => {
  const res = await axiosInstance.post("/auth/resend-otp/", data);
  return res.data;
};

export const loginUser = async (data: Login) => {
  const res = await axiosInstance.post("/auth/login/", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout/");
  return res.data;
};
