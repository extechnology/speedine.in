import getAboutBanner from "../api/getAboutBanners";
import { useQuery } from "@tanstack/react-query";
import type { AboutBanner } from "../types";

const useAboutBanners = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    { results: AboutBanner[] },
    Error
  >({
    queryKey: ["aboutBanner"],
    queryFn: getAboutBanner,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    aboutBanner: data?.results || [],
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useAboutBanners;
