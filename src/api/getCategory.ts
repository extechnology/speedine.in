import axiosInstance from "./axiosInstance";

const getCategory = async () => {
  const response = await axiosInstance.get("/categories/contact-banner/");
  return response.data;
};

export default getCategory;
