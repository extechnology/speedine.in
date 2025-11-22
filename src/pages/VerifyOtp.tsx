import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyOtp, ResendOTP } from "../services/authService";

const OtpVerify = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.identifier;
  const password = state?.password;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (!email || !password) navigate("/auth");
  }, [email, password, navigate]);

  useEffect(() => {
    if (resendTimer === 0) return;

    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!otp || otp.length < 6) {
      setErrorMsg("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({
        identifier: email,
        password: password,
        otp: Number(otp),
      });

      if (res?.success) {
        navigate("/");
      } else {
        setErrorMsg(res?.message || "Invalid OTP. Try again.");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      const res = await ResendOTP({ identifier: email });
      console.log(res)
      setErrorMsg("");
      setOtp("");
      setResendTimer(30);
    } catch {
      setErrorMsg("Failed to resend OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md animate-fadeIn">
        <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>

        <p className="text-gray-600 mb-4">
          We sent a 6-digit OTP to:{" "}
          <span className="font-semibold text-gray-800">{email}</span>
        </p>

        {errorMsg && (
          <p className="text-red-600 text-sm font-semibold mb-3">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            inputMode="numeric"
            autoFocus
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replaceAll(/\D/g, ""))}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D1A837] outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-xl transition
              ${
                loading
                  ? "bg-[#D1A837]/60 cursor-not-allowed"
                  : "bg-[#D1A837] hover:bg-[#b78d2f]"
              }
            `}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={resendOtp}
          disabled={loading || resendTimer > 0}
          className="w-full text-sm text-[#D1A837] mt-4 underline-offset-4 hover:underline disabled:opacity-50"
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;
