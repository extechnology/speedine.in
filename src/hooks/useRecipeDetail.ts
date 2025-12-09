import { useQuery } from "@tanstack/react-query";
import getRecipeDetail from "../api/getRecipeDetail";
import type { Recipe } from "../types";

const useRecipeDetail = (id: number) => {
  const { data, isLoading, isError, error, refetch } = useQuery<Recipe, Error>({
    queryKey: ["recipe-detail", id],
    queryFn: () => getRecipeDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    recipeDetail: data || null,
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useRecipeDetail;
