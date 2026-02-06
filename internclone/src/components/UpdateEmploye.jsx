import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncloademploye,
  updateEmployeDetails,
  uploadOrganizationLogo,
} from "../store/userActions";
import { toast } from "react-toastify";
import EmNavbar from "./EmNavbar";

const UpdateEmploye = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    organizationname: "",
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  /* Load user data safely */
  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
        organizationname: user.organizationname || "",
      });
      setPreview(user.organizationLogo?.url || "");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setLogo(file);
    setPreview(URL.createObjectURL(file));
  };

  /* Update profile */
  const handleProfileUpdate = async () => {
    try {
      await dispatch(updateEmployeDetails(user._id, formData));
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  /* Upload logo */
  const handleLogoUpload = async () => {
    if (!logo) {
      toast.error("Please select a logo");
      return;
    }

    const data = new FormData();
    data.append("organizationLogo", logo);

    try {
      await dispatch(uploadOrganizationLogo(user._id, data));
      toast.success("Organization logo updated");
    } catch {
      toast.error("Failed to upload logo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmNavbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-8">
            Update Employer Profile
          </h2>

          {/* LOGO SECTION */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src={preview || "/company.png"}
              alt="logo"
              className="h-28 w-28 rounded-xl object-cover border"
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Organization Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="text-sm"
              />
              <button
                type="button"
                onClick={handleLogoUpload}
                className="mt-3 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
              >
                Upload Logo
              </button>
            </div>
          </div>

          {/* PROFILE FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              name="organizationname"
              value={formData.organizationname}
              onChange={handleChange}
              placeholder="Organization Name"
              className="input md:col-span-2"
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="button"
              onClick={handleProfileUpdate}
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Input styles */}
      <style>
        {`
          .input {
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 10px;
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

export default UpdateEmploye;
