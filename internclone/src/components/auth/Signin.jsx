import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignin } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(asyncsignin(formData));
  };

  // ✅ REDIRECT AFTER LOGIN
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate("/student/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // ❌ ERROR HANDLING
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-12">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Student Login
          </h2>

          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-medium">
                Sign Up
              </Link>
            </p>

            <p className="text-sm text-center">
              <Link to="/send-mail" className="text-indigo-600 font-medium">
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            outline: none;
          }
          .input:focus {
            border-color: #6366f1;
          }
        `}
      </style>
    </div>
  );
};

export default Signin;
