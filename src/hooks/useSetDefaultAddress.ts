import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: number) =>
      axiosInstance.patch(`/users/user-address/${addressId}/`, {
        is_default: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-address"] });
    },
  });
};
