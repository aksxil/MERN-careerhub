import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addJobPost, asyncloademploye } from "../../store/userActions";

const AddJobPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    skills: "",
    jobtype: "In office",
    openings: 1,
    location: "",
    salary: "",
    description: "",
    responsibility: "",
    preferences: "",
    perks: "",
    assesments: "",
  });

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
      await dispatch(addJobPost(formData));
      toast.success("Job posted successfully");
      onClose();
    } catch {
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

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

        <h2 className="text-2xl font-bold mb-6">Post New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Job Title *"
              value={formData.title}
              onChange={handleChange}
              className="input"
            />
            <input
              name="skills"
              placeholder="Required Skills"
              value={formData.skills}
              onChange={handleChange}
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
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* DETAILS */}
          <textarea
            name="description"
            placeholder="Job Description *"
            value={formData.description}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="responsibility"
            placeholder="Responsibilities"
            value={formData.responsibility}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="preferences"
            placeholder="Candidate Preferences"
            value={formData.preferences}
            onChange={handleChange}
            className="input"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="openings"
              type="number"
              placeholder="Openings"
              value={formData.openings}
              onChange={handleChange}
              className="input"
            />
            <input
              name="salary"
              type="number"
              placeholder="Salary (per month) *"
              value={formData.salary}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* EXTRA */}
          <textarea
            name="perks"
            placeholder="Perks & Benefits"
            value={formData.perks}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="assesments"
            placeholder="Assessments"
            value={formData.assesments}
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>

      {/* INPUT STYLE */}
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

export default AddJobPost;
