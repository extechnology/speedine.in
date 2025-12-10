import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance"; 
import type { Category } from "../types";


const fetchCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/categories/category-list/");
  return res.data;
};

export const useCategories = () => {
  const { data, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: data || [],
    loading: isLoading,
    error: isError,
  };
};
