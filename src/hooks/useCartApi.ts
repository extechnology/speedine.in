import { addCartItem } from "../api/cartApi";
import { toast } from "sonner";

export default function useCartActions() {
  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const  isLoggedIn  = localStorage.getItem("accessToken") ? true : false;

      if (!isLoggedIn) {
        toast.error("Please login to add items to cart!");
        return;
      }

      toast.promise(addCartItem(productId, quantity), {
        loading: "Adding to cart...",
        success: "Added to cart! 🛒",
        error: "Failed to add!",
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong.");
    }
  };

  return { addToCart };
}
