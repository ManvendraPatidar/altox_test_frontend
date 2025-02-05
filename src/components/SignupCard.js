import React, { useEffect, useState } from "react";
import axiosInstance from "../services/AxiosInstance";

const SignupCard = ({ setIsSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [organizationList , setOrganizationList] = useState([]); 

  const handleSubmit = async() => {
    
    console.log("Signup --", email, organization);
    
    try {
      const response = await axiosInstance.post('register-user', {
          email,
          password,
          organizationId: organization
      });

      console.log('User registered:', response.data);
     
  } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
  }


  };

  
  const getOrganisations = async()=>{
    try{
      const response = await axiosInstance.get("/organizations");
      setOrganizationList(response.data.organizations);
    }catch(error)
    {
      console.log(error);
    }
  } 
   
  useEffect(()=>{
    getOrganisations();

  },[]);
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Email
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
            Password
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
            Organization
          </label>
          <select
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
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
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
      <div className="text-center mt-4">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => {  setIsSignUp(false)}}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
