import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloaduser, studentResetPassword } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar";

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const studentId = useSelector((state) => state.user.user?._id);
  const isLoading = useSelector((state) => state.user.isLoading);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(studentResetPassword(studentId, formData.password));
      toast.success("Password changed successfully");
      setFormData({ password: "", confirmPassword: "" });
    } catch {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Change Password
            </h2>
            <p className="text-gray-500 mt-2">
              Create a strong new password for your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm new password"
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
              {isLoading ? "Updating..." : "Change Password"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Make sure your password is at least 8 characters long
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
