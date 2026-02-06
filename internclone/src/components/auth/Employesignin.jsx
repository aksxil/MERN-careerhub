import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncempsignin } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const Employesignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useSelector(
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

    const res = await dispatch(asyncempsignin(formData));

    if (res?.error) {
      toast.error(res.error.message || "Invalid email or password");
    } else {
      toast.success("Employer login successful");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/employe/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-12">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Employer Login
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
              disabled={isLoading}
              className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link to="/employe/signup" className="text-indigo-600 font-medium">
                Sign Up
              </Link>
            </p>

            <p className="text-sm text-center">
              <Link
                to="/employe/send-mail"
                className="text-indigo-600 font-medium"
              >
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* INPUT STYLES */}
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

export default Employesignin;
