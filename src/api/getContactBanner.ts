import axiosInstance from "./axiosInstance";

const getContactBanner = async () => {
  const response = await axiosInstance.get("/ui/contact-banner/");
  return response.data;
};

export default getContactBanner;
