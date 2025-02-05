import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../services/AxiosInstance";
import { CgSpinner } from "react-icons/cg";

const LoginCard = ({ setIsSignUp }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", response?.data?.token);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data.error || "something went wrong");
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Email <span className="text-red-600 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Password <span className="text-red-600 ml-1">*</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? (
            <CgSpinner className="w-7 h-7 animate-spin text-white" />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => setIsSignUp(true)}
        >
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
