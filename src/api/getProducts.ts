import axiosInstance from "./axiosInstance";

const getProducts = async () => {
  const response = await axiosInstance.get("/products/list/");
  return response.data;
};

export default getProducts;
