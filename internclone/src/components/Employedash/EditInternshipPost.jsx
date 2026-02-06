import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  fetchInternshipDetails,
  updateInternshipPost,
} from "../../store/userActions";

const EditInternshipPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { internshipId } = useParams();

  const internship = useSelector(
    (state) => state.user.internshipDetails[internshipId]
  );

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    profile: "",
    skill: "",
    internshiptype: "In office",
    openings: 1,
    from: "",
    to: "",
    duration: "",
    responsibility: "",
    perks: "",
    stipendStatus: "Fixed",
    stipendAmount: "",
    assesments: "",
    location: "",
  });

  useEffect(() => {
    dispatch(fetchInternshipDetails(internshipId));
  }, [dispatch, internshipId]);

  useEffect(() => {
    if (internship) {
      setFormData({
        profile: internship.profile || "",
        skill: internship.skill || "",
        internshiptype: internship.internshiptype || "In office",
        openings: internship.openings || 1,
        from: internship.from || "",
        to: internship.to || "",
        duration: internship.duration || "",
        responsibility: internship.responsibility || "",
        perks: internship.perks || "",
        stipendStatus: internship.stipend?.status || "Fixed",
        stipendAmount: internship.stipend?.amount || "",
        assesments: internship.assesments || "",
        location: internship.location || "",
      });
    }
  }, [internship]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profile || !formData.duration || !formData.responsibility) {
      toast.error("Please fill all required fields");
      return;
    }

    if (
      formData.stipendStatus !== "Unpaid" &&
      Number(formData.stipendAmount) <= 0
    ) {
      toast.error("Please enter valid stipend amount");
      return;
    }

    const updatedData = {
      ...formData,
      stipend: {
        status: formData.stipendStatus,
        amount:
          formData.stipendStatus === "Unpaid"
            ? 0
            : Number(formData.stipendAmount),
      },
    };

    setLoading(true);
    try {
      await dispatch(updateInternshipPost(internshipId, updatedData));
      toast.success("Internship updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update internship");
    } finally {
      setLoading(false);
    }
  };

  if (!internship) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start overflow-auto py-10">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Internship</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="profile"
              value={formData.profile}
              onChange={handleChange}
              placeholder="Profile *"
              className="input"
            />
            <input
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              placeholder="Skills"
              className="input"
            />
            <select
              name="internshiptype"
              value={formData.internshiptype}
              onChange={handleChange}
              className="input"
            >
              <option>In office</option>
              <option>Remote</option>
            </select>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="input"
            />
          </div>

          <textarea
            name="responsibility"
            value={formData.responsibility}
            onChange={handleChange}
            placeholder="Responsibilities *"
            className="input"
          />

          <textarea
            name="perks"
            value={formData.perks}
            onChange={handleChange}
            placeholder="Perks"
            className="input"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="openings"
              type="number"
              value={formData.openings}
              onChange={handleChange}
              className="input"
            />
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration *"
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="stipendStatus"
              value={formData.stipendStatus}
              onChange={handleChange}
              className="input"
            >
              <option>Fixed</option>
              <option>Negotiable</option>
              <option>Performance Based</option>
              <option>Unpaid</option>
            </select>

            {formData.stipendStatus !== "Unpaid" && (
              <input
                name="stipendAmount"
                type="number"
                value={formData.stipendAmount}
                onChange={handleChange}
                placeholder="Stipend Amount"
                className="input"
              />
            )}
          </div>

          <textarea
            name="assesments"
            value={formData.assesments}
            onChange={handleChange}
            placeholder="Assessments"
            className="input"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Internship"}
          </button>
        </form>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 12px;
            border-radius: 10px;
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

export default EditInternshipPost;
