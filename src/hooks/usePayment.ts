import axiosInstance from "../api/axiosInstance";
import { loadRazorpayScript } from "../utils/loadRazorpay";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { PaymentPayload,RazorpayOrderResponse } from "../types";

export default function usePayment() {
  const navigate = useNavigate();

  const initiatePayment = async (payload: PaymentPayload) => {
    const sdkLoaded = await loadRazorpayScript();

    if (!sdkLoaded) {
      toast.error("Payment gateway failed to load");
      return;
    }

    try {
      const res = await axiosInstance.post<RazorpayOrderResponse>(
        "/payments/create-order/",
        payload,
        { withCredentials: true }
      );

      const order = res.data;

      const options = {
        key: order.key,
        amount: order.amount.toString(),
        currency: "INR",
        order_id: order.order_id,
        name: "Your Brand",
        description: "Secure Payment",
        handler: async (response: any) => {
          try {
            await axiosInstance.post(
              "/payments/verify/",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            toast.success("Payment successful!");
            navigate("/order-confirm");
          } catch (err) {
            toast.error("Verification failed");
          }
        },
        theme: { color: "#DBB737" },
      };

      const paymentWindow = new window.Razorpay(options);

      paymentWindow.on("payment.failed", function () {
        toast.error("Payment failed");
        navigate("/payment-failed");
      });

      paymentWindow.open();
    } catch (err) {
      toast.error("Couldn't start payment");
    }
  };

  return { initiatePayment };
}
