import axiosInstance from "../api/axiosInstance";
import type { PaymentPayload,RazorpayOrderResponse } from "../types";

export const createOrder = async (
  checkoutData: PaymentPayload
): Promise<RazorpayOrderResponse> => {
  const res = await axiosInstance.post<RazorpayOrderResponse>(
    "/users/create-order/",
    checkoutData,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

interface VerifyPayload {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export const verifyPayment = async (
  data: VerifyPayload
): Promise<{ message: string }> => {
  const res = await axiosInstance.post<{ message: string }>(
    "/users/verify-payment/",
    data,
    {
      withCredentials: true,
    }
  );

  return res.data;
};
