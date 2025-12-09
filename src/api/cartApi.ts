import axiosInstance from "./axiosInstance";

export const getCart = async () => {
  const res = await axiosInstance.get("/users/cart/");
  return res.data;
};

export const addCartItem = async (productId: string, quantity: number) => {
  const res = await axiosInstance.post("/users/cart-items/", {
    product_id: productId,
    quantity,
  });
  return res.data;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const res = await axiosInstance.patch(`users/cart-items/${itemId}/`, {
    quantity,
  });
  return res.data;
};
