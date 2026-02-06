import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignup } from "../../store/userActions";
import Navbar from "../Navbar";

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    city: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(asyncsignup(formData));
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/student/dashboard");
    }
  }, [user.isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

          {/* HEADER */}
          <h2 className="text-3xl font-bold text-center text-indigo-600">
            Create Student Account
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Start your journey with <span className="font-semibold">CareerHub</span>
          </p>

          {/* FORM */}
          <form
            className="mt-8 space-y-5"
            onSubmit={submitHandler}
          >
            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="input"
                name="firstname"
                type="text"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                className="input"
                name="lastname"
                type="text"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            {/* CONTACT */}
            <input
              className="input"
              name="contact"
              type="text"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* CITY */}
            <input
              className="input"
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            {/* GENDER */}
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Gender
              </label>
              <div className="flex gap-6">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 cursor-pointer text-gray-600"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-indigo-600"
                      required
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* PASSWORD */}
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Create Account
            </button>

            {/* FOOTER */}
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* INPUT STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          background: white;
        }
      `}</style>
    </div>
  );
};

export default Signup;
