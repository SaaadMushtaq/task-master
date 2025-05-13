import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { signup } from "../api/auth";
import { FaUserPlus } from "react-icons/fa";
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
    }
    if (firstName.trim() && firstName.length < 3) {
      err.firstName = "First name must be at least 3 characters";
    }

    if (!lastName.trim()) {
      err.lastName = "Last name is required";
    }

    if (lastName.trim() && lastName.length < 3) {
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
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Signup failed. Try another email.",
      }));
      toast.error("Error! Failed to signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full animated-gradient flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <span className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaUserPlus size={32} /> Sign Up
        </span>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

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
              placeholder="At least 8 characters"
              className="w-full px-3 py-2 outline-none border-none bg-gray-100 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 flex items-center justify-center rounded ${
              isLoading ? "bg-gray-200" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <span className="cursor-pointer">Sign Up</span>
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/login" className="text-blue-500 font-bold hover:underline">
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
