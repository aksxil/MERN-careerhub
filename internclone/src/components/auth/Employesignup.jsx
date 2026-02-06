import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import { asyncempsignup } from "../../store/userActions";

const Employesignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    organizationname: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await dispatch(asyncempsignup(formData));

    if (res?.error) {
      toast.error(res.error.message || "Signup failed");
    } else {
      toast.success("Employer account created successfully");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/employe/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Employer Sign Up
          </h2>

          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex gap-2">
              <input
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                className="input"
              />
            </div>

            <input
              name="organizationname"
              placeholder="Organization Name"
              value={formData.organizationname}
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="contact"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="input"
            />

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
              {isLoading ? "Creating..." : "Create Account"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/employe/signin" className="text-indigo-600 font-medium">
                Sign In
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

export default Employesignup;
