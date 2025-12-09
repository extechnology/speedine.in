import getStepTellsStory from "../api/getStepTellsStory";
import { useQuery } from "@tanstack/react-query";
import type { StepTellsStory } from "../types";

const useStepTellsStory = () => {
    const { data, isLoading, isError, error, refetch } = useQuery<
      { results: StepTellsStory[] },
      Error
    >({
      queryKey: ["stepTells"],
      queryFn: getStepTellsStory,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });

    return {
      stepTells: data?.results || [],
      loading: isLoading,
      error: isError ? error.message : null,
      refetch,
    };
}

export default useStepTellsStory;