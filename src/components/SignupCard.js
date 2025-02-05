import React, { useEffect, useState } from "react";
import axiosInstance from "../services/AxiosInstance";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

const SignupCard = ({ setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState();
  const [organizationList, setOrganizationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/register-user", {
        email,
        password,
        organizationId: organizationId,
      });

      toast.success("User registered successfully!");
      setIsSignUp(false);
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

  const getOrganisations = async () => {
    try {
      const response = await axiosInstance.get("/organizations");
      setOrganizationList(response.data.organizations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrganisations();
  }, []);
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
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

        <div className="mb-6">
          <label
            htmlFor="organization"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Organization <span className="text-red-600 ml-1">*</span>
          </label>
          <select
            id="organization"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Organization</option>
            {organizationList.map((org, index) => (
              <option key={index} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 flex justify-center bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isLoading ? (
            <CgSpinner className="w-7 h-7 animate-spin text-white" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => {
            setIsSignUp(false);
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
