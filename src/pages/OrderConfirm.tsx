import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;
  console.log(orderId, "order id");
  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 w-2 h-2 rounded-full animate-confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: [
              "#fbbf24",
              "#f59e0b",
              "#d97706",
              "#b45309",
              "#92400e",
            ][Math.floor(Math.random() * 5)],
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}

      {/* Main Card */}
      <div className="bg-amber-950 rounded-3xl shadow-2xl p-8 sm:p-12 max-w-lg w-full text-center relative z-10 border border-amber-800">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6 animate-bounce">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 mb-3">
          Order Confirmed!
        </h1>

        {/* Thank You Message */}
        <p className="text-lg sm:text-xl text-amber-200 mb-8">
          Thank you for your purchase
        </p>

        {/* Order ID */}
        <div className="bg-amber-900 border border-amber-700 rounded-xl p-6 mb-8">
          <p className="text-sm text-amber-300 mb-2 uppercase tracking-wide">
            Order ID
          </p>
          <p className="text-xl font-bold text-amber-100 font-mono tracking-wider">
            {orderId ?? "---"}
          </p>
        </div>

        {/* Additional Info */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-linear-to-r from-amber-600 to-amber-500 text-white font-semibold 
             rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
