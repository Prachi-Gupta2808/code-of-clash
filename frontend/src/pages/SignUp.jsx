import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Vortex } from "../components/ui/vortex";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        { withCredentials: true }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        if (!tokenResponse.credential) return alert("Google login failed");

        const res = await axios.post(
          "http://localhost:5000/api/auth/google",
          { token: tokenResponse.credential }, // send ID token
          { withCredentials: true }
        );

        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } catch (err) {
        console.error(err.response?.data);
        alert(err.response?.data?.message || "Google signup failed");
      }
    },
    onError: () => {
      alert("Google login failed");
    },
  });

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <Vortex
          backgroundColor="black"
          className="flex items-center justify-center w-full h-full"
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <form
          onSubmit={handleSubmit}
          className="bg-black/30 backdrop-blur-[12px] backdrop-saturate-150 border border-white/20 text-white p-10 rounded-xl max-w-md w-full space-y-4 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#F2613F]"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#F2613F]"
            required
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#F2613F]"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-[#F2613F]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#F2613F] hover:bg-[#9B3922] py-2 rounded-md font-semibold transition-colors"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => googleSignup()}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 border border-white/20 py-2 rounded-md font-medium transition-colors"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#F2613F] hover:text-[#9B3922] cursor-pointer font-medium"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
