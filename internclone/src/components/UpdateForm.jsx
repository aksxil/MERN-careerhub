import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloaduser,
  updateUserDetails,
  uploadAvatar,
} from "../store/userActions";

const UpdateForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  /* SAFELY INITIALIZE FORM */
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    city: "",
    gender: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  /* LOAD USER DATA */
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
        city: user.city || "",
        gender: user.gender || "",
      });
      setPreview(user.avatar?.url || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  /* UPDATE PROFILE */
  const handleProfileUpdate = async () => {
    try {
      await dispatch(updateUserDetails(user._id, formData));
      toast.success("Profile updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  /* UPLOAD AVATAR */
  const handleAvatarUpload = async () => {
    if (!avatar) {
      toast.error("Please select an avatar");
      return;
    }

    const data = new FormData();
    data.append("avatar", avatar);

    try {
      await dispatch(uploadAvatar(user._id, data));
      toast.success("Avatar updated successfully");
      onClose();
    } catch {
      toast.error("Failed to upload avatar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Update Profile
        </h2>

        {/* AVATAR */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={preview || "/avatar.png"}
            alt="avatar"
            className="h-24 w-24 rounded-full object-cover border"
          />
          <label className="cursor-pointer text-indigo-600 font-medium">
            Change Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
          />
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="input"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
          />
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="input"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="input"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleAvatarUpload}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            Upload Avatar
          </button>

          <button
            onClick={handleProfileUpdate}
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* INPUT STYLES */}
      <style>
        {`
          .input {
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
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

export default UpdateForm;
