import getUserAddress from "../api/getUserAddress";
import { useQuery } from "@tanstack/react-query";
import type { UserAddress } from "../types";

const useUserAddress = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    UserAddress,
    Error
  >({
    queryKey: ["user-address"],
    queryFn: getUserAddress,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    userAddress: data || null,
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useUserAddress;
