import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addInternshipPost, asyncloademploye } from "../../store/userActions";

const AddInternshipPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    profile: "",
    skill: "",
    internshiptype: "In office",
    openings: 1,
    from: "",
    to: "",
    duration: "",
    responsibility: "",
    preferences: "",
    stipendStatus: "Fixed",
    stipendAmount: "",
    perks: "",
    assesments: "",
    location: "",
  });

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

    setLoading(true);

    const { stipendStatus, stipendAmount, ...rest } = formData;

    const postData = {
      ...rest,
      stipend: {
        status: stipendStatus,
        amount:
          stipendStatus === "Unpaid" ? 0 : Number(stipendAmount),
      },
    };

    try {
      await dispatch(addInternshipPost(postData));
      toast.success("Internship posted successfully");
      onClose();
    } catch {
      toast.error("Failed to post internship");
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

        <h2 className="text-2xl font-bold mb-6">
          Post New Internship
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="profile"
              placeholder="Internship Profile *"
              value={formData.profile}
              onChange={handleChange}
              className="input"
            />
            <input
              name="skill"
              placeholder="Required Skills"
              value={formData.skill}
              onChange={handleChange}
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
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* DETAILS */}
          <textarea
            name="responsibility"
            placeholder="Responsibilities *"
            value={formData.responsibility}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="preferences"
            placeholder="Preferences"
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
              name="duration"
              placeholder="Duration (e.g. 3 months) *"
              value={formData.duration}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* STIPEND */}
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
                placeholder="Stipend Amount"
                value={formData.stipendAmount}
                onChange={handleChange}
                className="input"
              />
            )}
          </div>

          {/* EXTRA */}
          <textarea
            name="perks"
            placeholder="Perks"
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
            {loading ? "Posting..." : "Post Internship"}
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

export default AddInternshipPost;
