import { useEffect, useState, useCallback } from "react";
import { getCart } from "../api/cartApi";
import type { Cart } from "../types";

export default function useCart() {
  const [cart, setCart] = useState<Cart | null>(null); // ✅ single cart object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCart(); // backend returns ONE object
      setCart(data); // ✅ store it directly
      setError(null);
    } catch (err: any) {
      console.error("Error loading cart:", err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return {
    cart, // Cart | null
    loading,
    error,
    refreshCart: fetchCart,
  };
}
