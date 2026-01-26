import { useState } from "react";
import { toast } from "sonner";
import {
  requestResetOTP,
  resendResetOTP,
  verifyResetOTP,
  changePassword,
} from "../services/resetPasswordService";
import { Mail, KeyRound, Lock, ArrowRight } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [resendingOTP, setResendingOTP] = useState(false);


  const handleSendOTP = async () => {
    try {
      setSendingOTP(true);
      await requestResetOTP(identifier);
      toast.success("OTP sent");
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setSendingOTP(false);
    }
  };


  const handleVerifyOTP = async () => {
    try {
      setVerifyingOTP(true);
      await verifyResetOTP(identifier, otp);
      toast.success("OTP verified");
      setStep(3);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setVerifyingOTP(false);
    }
  };


  const handleChangePassword = async () => {
    try {
      setChangingPassword(true);
      await changePassword(identifier, password);
      toast.success("Password reset successful");
      window.location.href = "/auth";
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to reset password");
    } finally {
      setChangingPassword(false);
    }
  };


  const handleResendOTP = async () => {
    try {
      setResendingOTP(true);
      await resendResetOTP(identifier);
      toast.success("OTP resent");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setResendingOTP(false);
    }
  };


  const Spinner = () => (
    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#640000] mb-2">
            {step === 1 && "Reset your password"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Create new password"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {step === 1 && "We’ll send an OTP to your email or phone"}
            {step === 2 && "Enter the OTP sent to you"}
            {step === 3 && "Choose a strong password"}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
            ${
              step >= s
                ? "bg-[#640000] text-white"
                : "bg-gray-200 text-gray-500"
            }
          `}
                >
                  {s}
                </div>

                {s !== 3 && (
                  <div
                    className={`w-12 h-2 mx-2 rounded
              ${step > s ? "bg-[#640000]" : "bg-gray-200"}
            `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="Email or phone number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={sendingOTP}
              className="w-full py-3 bg-[#640000] text-white rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {sendingOTP ? (
                <Spinner />
              ) : (
                <>
                  Send OTP <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none tracking-widest text-center"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={verifyingOTP}
              className="w-full py-3 bg-black text-white rounded-lg font-medium transition disabled:opacity-60"
            >
              {verifyingOTP ? <Spinner /> : "Verify OTP"}
            </button>

            <button
              onClick={handleResendOTP}
              disabled={resendingOTP}
              className="w-full text-sm text-gray-600 hover:text-black transition disabled:opacity-50"
            >
              {resendingOTP ? "Resending..." : "Didn’t receive OTP? Resend"}
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="w-full py-3 bg-black text-white rounded-lg font-medium transition disabled:opacity-60"
            >
              {changingPassword ? <Spinner /> : "Change Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
