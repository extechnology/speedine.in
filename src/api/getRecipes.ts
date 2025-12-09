import axiosInstance from "./axiosInstance";

const getRecipes = async () => {
    const res = await axiosInstance.get("/recipes/recipe-list/")
    return res.data;
}

export default getRecipes