import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserAddress } from "../api/addressApi";

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-address"] })

    },
  });
};
