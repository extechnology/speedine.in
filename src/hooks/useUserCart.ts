import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/cartApi";
import type { Cart } from "../types";

export const CART_QUERY_KEY = ["cart"];

export default function useCart() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const {
    data: cart = null,
    isLoading: loading,
    error,
    refetch: refreshCart,
  } = useQuery<Cart | null>({
    queryKey: CART_QUERY_KEY,
    queryFn: async () => {
      try {
        const data = await getCart();
        return data;
      } catch (err: any) {
        console.error("Error loading cart:", err);
        throw err;
      }
    },
    enabled: isLoggedIn,
    staleTime: 1000 * 30,
    retry: 1,
  });

  const totalItems =
    cart?.total_items ??
    cart?.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) ??
    0;

  return {
    cart: isLoggedIn ? cart : null,
    totalItems: isLoggedIn ? totalItems : 0,
    loading: isLoggedIn ? loading : false,
    error: error ? "Failed to load cart" : null,
    refreshCart,
  };
}

