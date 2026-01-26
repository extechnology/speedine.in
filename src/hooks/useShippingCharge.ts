import getShippingCharge from "../api/getShipping";
import { useQuery } from "@tanstack/react-query";

export const useShippingCharge = () => {
  const { data, isLoading, isError } = useQuery<number, Error>({
    queryKey: ["shippingCharge"],
    queryFn: getShippingCharge,
    staleTime: 1000 * 60 * 5,
  });

  return { shippingCharge: data || 0, loading: isLoading, error: isError };
};
