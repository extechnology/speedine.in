import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/getCurrentUser";

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
 
  return {
    user,
    loading: isLoading,
    isAuthenticated: !!user,
  };
}