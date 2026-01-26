import axiosInstance from "../api/axiosInstance";

export const requestResetOTP = (identifier: string) =>
  axiosInstance.post("auth/password/reset/otp/", { identifier });

export const resendResetOTP = (identifier: string) =>
  axiosInstance.post("auth/password/reset/otp/resent/", { identifier });

export const verifyResetOTP = (identifier: string, otp: string) =>
  axiosInstance.post("auth/password/reset/otp/verify/", { identifier, otp });

export const changePassword = (identifier: string, new_password: string) =>
  axiosInstance.patch("auth/password/change/", { identifier, new_password });
