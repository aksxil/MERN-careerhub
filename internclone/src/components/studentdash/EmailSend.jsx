import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPasswordLink } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(sendForgotPasswordLink(email));
      toast.success("Password reset link sent to your email");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Forgot Password
            </h2>
            <p className="text-gray-500 mt-2">
              Enter your registered email to receive a reset link
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-xl font-semibold text-white transition
                ${
                  isLoading
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
            >
              {isLoading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Remembered your password?{" "}
            <span className="text-indigo-600 font-medium cursor-pointer">
              Go back to login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
