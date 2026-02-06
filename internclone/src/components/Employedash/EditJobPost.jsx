import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  fetchJobDetails,
  updateJobPost,
} from "../../store/userActions";

const EditJobPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const job = useSelector(
    (state) => state.user.jobDetails[jobId]?.job
  );

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    jobtype: "In office",
    openings: 1,
    description: "",
    preferences: "",
    salary: "",
    perks: "",
    responsibility: "",
    assesments: "",
    location: "",
  });

  useEffect(() => {
    dispatch(fetchJobDetails(jobId));
  }, [dispatch, jobId]);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        skills: job.skills || "",
        jobtype: job.jobtype || "In office",
        openings: job.openings || 1,
        description: job.description || "",
        preferences: job.preferences || "",
        salary: job.salary || "",
        perks: job.perks || "",
        responsibility: job.responsibility || "",
        assesments: job.assesments || "",
        location: job.location || "",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.salary) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateJobPost(jobId, formData));
      toast.success("Job updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
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

        <h2 className="text-2xl font-bold mb-6">
          Edit Job Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title *"
              className="input"
            />
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Required Skills"
              className="input"
            />
            <select
              name="jobtype"
              value={formData.jobtype}
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description *"
            className="input"
          />

          <textarea
            name="responsibility"
            value={formData.responsibility}
            onChange={handleChange}
            placeholder="Responsibilities"
            className="input"
          />

          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="Candidate Preferences"
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
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary (per month) *"
              className="input"
            />
          </div>

          <textarea
            name="perks"
            value={formData.perks}
            onChange={handleChange}
            placeholder="Perks & Benefits"
            className="input"
          />

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
            {loading ? "Updating..." : "Update Job"}
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

export default EditJobPost;
