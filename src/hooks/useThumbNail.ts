import getThumbNail from "../api/getThumbNail";
import { useQuery } from "@tanstack/react-query";
import type { ThumbNail } from "../types";

const useThumbNail = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    { results: ThumbNail[] },
    Error
  >({
    queryKey: ["thumbnail"],
    queryFn: getThumbNail,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    thumbnail: data?.results || [],
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useThumbNail;
