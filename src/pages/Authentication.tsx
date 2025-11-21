import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { loginUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [form, setForm] = useState({
    username: "",
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register") {
      const res = await registerUser({
        username: form.username,
        identifier: form.identifier,
        password: form.password,
      });

      if (res.success) {
        navigate("/verify", { state: { identifier: form.identifier } });
      }
    } else {
      const res = await loginUser({
        identifier: form.identifier,
        password: form.password,
      });

      if (res.success) {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#D1A837]/10 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-3xl p-8 animate-fadeIn">
        {/* Auth Toggle */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            className={`text-lg font-semibold pb-1 border-b-2 transition ${
              mode === "login"
                ? "border-[#D1A837] text-[#D1A837]"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`text-lg font-semibold pb-1 border-b-2 transition ${
              mode === "register"
                ? "border-[#D1A837] text-[#D1A837]"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {/* Google Sign-in */}
        <button
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 mb-4"
          onClick={() =>
            (globalThis.location.href = "http://localhost:8000/auth/google")
          }
        >
          <BsGoogle size={20} /> Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            required
            placeholder="Identifier"
            value={form.identifier}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1A837] outline-none bg-gray-50"
          />

          {mode === "register" && (
            <>
              <input
                type="text"
                name="username"
                required
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1A837] bg-gray-50"
              />

              {/* <input
                type="password"
                name="cpassword"
                required
                placeholder="Confirm Password"
                value={form.cpassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1A837] bg-gray-50"
              /> */}
            </>
          )}

          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#D1A837] bg-gray-50"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#D1A837] text-white text-lg font-semibold rounded-xl hover:bg-[#b88e2e] transition"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        {/* Bottom link */}
        <p className="text-center mt-6 text-gray-600">
          {mode === "login" ? "Don't have an account?" : "Already registered?"}
          <button
            type="button"
            className="ml-1 text-[#D1A837] font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D1A837] inline-flex bg-transparent border-0 p-0"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
