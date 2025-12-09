import axiosInstance from "./axiosInstance";

const getAboutBanner = async () => {
  const response = await axiosInstance.get("/ui/about-us-section-images/");
  return response.data;
};

export default getAboutBanner;
