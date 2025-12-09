import { useQuery } from "@tanstack/react-query";
import type { CustomerReview } from "../types";
import getCustomerReview from "../api/getCustomerReview";

const useCustomerReview = () => {
    const { data, isLoading, isError, error, refetch } = useQuery<
      { results: CustomerReview[] },
      Error
    >({
      queryKey: ["review"],
      queryFn: getCustomerReview,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });

    return {
        review : data?.results || [],
        loading : isLoading,
        error : isError ? error.message : null,
        refetch,

    }
}

export default useCustomerReview