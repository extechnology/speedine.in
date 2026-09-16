import { addCartItem } from "../api/cartApi";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CART_QUERY_KEY } from "./useUserCart";

export default function useCartActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

      if (!isLoggedIn) {
        const returnUrl = location.pathname + location.search;
        sessionStorage.setItem(
          "pending_cart_action",
          JSON.stringify({ productId, quantity })
        );
        sessionStorage.setItem(
          "login_context",
          JSON.stringify({ from: returnUrl, source: "cart" })
        );
        toast.info("Please login to add items to your cart");
        navigate("/auth", {
          state: { from: returnUrl },
        });
        return;
      }

      toast.promise(
        async () => {
          const res = await addCartItem(productId, quantity);
          await queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
          return res;
        },
        {
          loading: "Adding to cart...",
          success: "Added to cart! 🛒",
          error: "Failed to add!",
          duration: 1100,
        }
      );
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong.");
    }
  };

  return { addToCart };
}

