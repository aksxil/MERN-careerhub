import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeResetPassword, asyncloademploye } from "../../store/userActions";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";

const ChangePasswordEm = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to continue</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await dispatch(
        employeResetPassword(user._id, formData.password)
      );
      toast.success("Password changed successfully");
      setFormData({ password: "", confirmPassword: "" });
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <EmNavbar />

      <div className="flex justify-center items-center py-14 px-4">
        <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      {/* INPUT STYLES */}
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

export default ChangePasswordEm;
