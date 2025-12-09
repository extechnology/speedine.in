import axiosInstance from "../api/axiosInstance";
import type {Contact} from "../types";


export const sendContactForm = async (data: Contact) => {
  try {
    const res = await axiosInstance.post("/users/contact-us/", data);
    return {
      success: true,
      message: res.data?.message || "Message sent!",
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Submission failed",
    };
  }
};
