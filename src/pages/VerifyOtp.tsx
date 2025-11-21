import { useLocation } from "react-router-dom";

const OtpVerify = () => {
  const { state } = useLocation();
  const email = state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
        <p className="text-gray-600 mb-4">
          We sent an OTP to: <span className="font-semibold">{email}</span>
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl mb-4"
        />

        <button className="w-full py-3 bg-[#D1A837] text-white font-semibold rounded-xl">
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;