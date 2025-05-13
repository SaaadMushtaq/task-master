import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { login } from "../api/auth";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Login: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateForm = (): boolean => {
    const err: { email?: string; password?: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      err.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      err.email = "Invalid email format";
    }

    if (!password) {
      err.password = "Password is required";
    } else if (password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res?.data.token);
      localStorage.setItem("username", res?.data.name);
      localStorage.setItem("email", res?.data.email);
      setTimeout(() => navigate("/dashboard"), 500);
      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      setErrors({ password: "Invalid credentials" });
      toast.error("Error! Failed to login");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full animated-gradient flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <span className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaUser size={32} /> Login
        </span>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 flex items-center justify-center cursor-pointer rounded ${
              isLoading ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? <Loader /> : <span>Login</span>}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
