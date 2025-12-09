import { useQuery } from "@tanstack/react-query";
import type { Products } from "../types";
import getProducts from "../api/getProducts";

const useProducts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    Products[],
    Error
  >({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    products: data || [],
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};


export default useProducts;
