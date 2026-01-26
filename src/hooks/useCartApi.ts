import { addCartItem } from "../api/cartApi";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

export default function useCartActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

      if (!isLoggedIn) {
        toast.error("Please login to add items to cart!");
        navigate("/auth", {
          state: { from: location.pathname },
          replace: true,
        });
        return;
      }

      toast.promise(addCartItem(productId, quantity), {
        loading: "Adding to cart...",
        success: "Added to cart! 🛒",
        error: "Failed to add!",
        duration: 1100,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong.");
    }
  };

  return { addToCart };
}
