import getRecipes from "../api/getRecipes";
import { useQuery } from "@tanstack/react-query";
import type { Recipe } from "../types";

const useRecipes = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    Recipe[],
    Error
  >({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    recipes: data || [],
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useRecipes;
