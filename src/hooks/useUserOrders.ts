import getUserOrder from "../api/getUserOrder";
import { useQuery } from "@tanstack/react-query";
import type { UserOrder } from "../types";

const useUserOrders = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    UserOrder[],
    Error
  >({
    queryKey: ["user-orders"],
    queryFn: getUserOrder,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });


  return {
    userOrders: data || [],
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };

};

export default useUserOrders;
