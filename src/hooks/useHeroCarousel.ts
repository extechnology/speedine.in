import { useQuery } from "@tanstack/react-query";
import getHeroCarousel from "../api/getHeroCarousel";
import type { HeroCarousel } from "../types";

const useHeroCarousel = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    { results: HeroCarousel[] },
    Error
  >({
    queryKey: ["hero-carousel"],
    queryFn: getHeroCarousel,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    carousel: data?.results || [], 
    loading: isLoading,
    error: isError ? error.message : null,
    refetch,
  };
};

export default useHeroCarousel;
