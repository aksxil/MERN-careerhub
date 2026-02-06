import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPasswordLinkEm } from "../../store/userActions";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";

const ForgotPasswordFormEM = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await dispatch(sendForgotPasswordLinkEm(email));
      toast.success("Password reset link sent to your email");
      setEmail("");
    } catch (err) {
      toast.error(
        err?.response?.data?.error ||
          "Failed to send reset link"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <EmNavbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-center mb-4">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Enter your registered email and we’ll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
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

export default ForgotPasswordFormEM;
