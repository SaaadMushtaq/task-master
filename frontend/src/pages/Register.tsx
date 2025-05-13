import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { signup } from "../api/auth";
import { FaUserPlus, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const Register: FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  const validateForm = (): boolean => {
    const err: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) {
      err.firstName = "First name is required";
    } else if (firstName.trim().length < 3) {
      err.firstName = "First name must be at least 3 characters";
    }

    if (!lastName.trim()) {
      err.lastName = "Last name is required";
    } else if (lastName.trim().length < 3) {
      err.lastName = "Last name must be at least 3 characters";
    }

    if (!email) {
      err.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      err.email = "Invalid email format";
    }

    if (!password) {
      err.password = "Password is required";
    } else if (password.length < 8) {
      err.password = "Password must be at least 8 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signup(firstName, lastName, email, password);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email already exists",
      }));
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white text-center">
          <div className="flex items-center justify-center gap-3">
            <FaUserPlus className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Create Account</h1>
          </div>
          <p className="mt-2 opacity-90">Join our community today</p>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSignup} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className={`w-full pl-9 pr-3 py-2 sm:py-3 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className={`w-full pl-9 pr-3 py-2 sm:py-3 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full pl-9 pr-3 py-2 sm:py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className={`w-full pl-9 pr-3 py-2 sm:py-3 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader />
                  Registering...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
