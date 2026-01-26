import { useEffect, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;

  const [particles, setParticles] = useState<
    Array<{ id: number; left: number; delay: number; size: number }>
  >([]);

  useEffect(() => {
    const items = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: 6 + Math.random() * 6,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#640000] via-[#5a0000] to-[#640000] px-4">
      {/* Soft floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 rounded-full bg-[#DBB737]/80 animate-float"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-[#DBB737]/30 p-8 sm:p-12 text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#DBB737]/15">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DBB737] shadow-lg">
            <Check className="h-8 w-8 text-[#640000]" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#640000] mb-2">
          Order Confirmed
        </h1>

        <p className="text-gray-600 mb-8">
          Your payment was successful. We’re preparing your order.
        </p>

        {/* Order ID */}
        <div className="mb-8 rounded-2xl border border-[#DBB737]/30 bg-[#DBB737]/10 px-6 py-5">
          <p className="text-xs uppercase tracking-widest text-[#640000]/70 mb-2">
            Order ID
          </p>
          <p className="font-mono text-lg font-semibold text-[#640000] break-all">
            {orderId ?? "—"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/account")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#640000] px-6 py-3 text-[#640000] font-medium hover:bg-[#640000] hover:text-white transition"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#DBB737] to-[#c9aa2f] px-6 py-3 font-semibold text-[#640000] shadow-lg hover:shadow-xl transition"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
