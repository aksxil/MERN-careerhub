import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobDetails,
  applyForJob,
  saveJobInternship,
} from "../../store/userActions";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { jobDetails, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const job = jobDetails?.[jobId]?.job;

  // 🔹 FETCH JOB
  useEffect(() => {
    const loadJob = async () => {
      try {
        await dispatch(fetchJobDetails(jobId));
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [dispatch, jobId]);

  // 🔹 APPLY JOB
  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    try {
      await dispatch(applyForJob(jobId));
      toast.success("Applied successfully");
    } catch (err) {
      toast.error("Failed to apply");
    }
  };

  // 🔹 SAVE JOB
  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    try {
      await dispatch(
        saveJobInternship(user._id, jobId, "job")
      );
      setIsSaved(true);
      toast.success("Job saved");
    } catch (err) {
      toast.error("Failed to save job");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-[70vh] flex items-center justify-center">
          <h2 className="text-xl">Loading job details...</h2>
        </div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="h-[70vh] flex items-center justify-center">
          <h2 className="text-xl text-red-500">
            Job not found
          </h2>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-600 mt-2">{job.location}</p>

        <div className="mt-6 space-y-2">
          <p><strong>Skills:</strong> {job.skills}</p>
          <p><strong>Type:</strong> {job.jobtype}</p>
          <p><strong>Openings:</strong> {job.openings}</p>
          <p><strong>Salary:</strong> ₹{job.salary}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg">Description</h3>
          <p className="text-gray-700 mt-2">{job.description}</p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleApply}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            Apply Now
          </button>

          <button
            onClick={handleSave}
            className="border px-6 py-2 rounded"
          >
            {isSaved ? "Saved" : "Save Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
