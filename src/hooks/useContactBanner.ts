import getContactBanner from "../api/getContactBanner";
import { useQuery } from "@tanstack/react-query";
import type { ContactBanner } from "../types";

const useContactBanner = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    { results: ContactBanner[] },
    Error
  >({
    queryKey: ["contactBanner"],
    queryFn: getContactBanner,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    contactBanner: data?.results || [],
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useContactBanner;
