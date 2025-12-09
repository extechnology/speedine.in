import axiosInstance from "./axiosInstance";

const getRecipeDetail = async (id: number) => {
  const response = await axiosInstance.get(`/recipes/recipes/${id}`);
  return response.data;
};

export default getRecipeDetail;
