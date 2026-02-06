import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInternshipDetails,
  applyForInternship,
  saveJobInternship,
} from "../../store/userActions";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const InternDetailsPage = () => {
  const { internshipId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { internshipDetails, isAuthenticated, user } =
    useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const internship =
    internshipDetails?.[internshipId]?.internship;

  // 🔹 FETCH INTERNSHIP
  useEffect(() => {
    const loadInternship = async () => {
      try {
        await dispatch(fetchInternshipDetails(internshipId));
      } finally {
        setLoading(false);
      }
    };
    loadInternship();
  }, [dispatch, internshipId]);

  // 🔹 APPLY
  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    try {
      await dispatch(applyForInternship(internshipId));
      toast.success("Applied successfully");
    } catch (err) {
      toast.error("Failed to apply");
    }
  };

  // 🔹 SAVE
  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }

    try {
      await dispatch(
        saveJobInternship(user._id, internshipId, "internship")
      );
      setIsSaved(true);
      toast.success("Internship saved");
    } catch (err) {
      toast.error("Failed to save internship");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-[70vh] flex items-center justify-center">
          <h2 className="text-xl">Loading internship...</h2>
        </div>
      </>
    );
  }

  if (!internship) {
    return (
      <>
        <Navbar />
        <div className="h-[70vh] flex items-center justify-center">
          <h2 className="text-xl text-red-500">
            Internship not found
          </h2>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold">
          {internship.profile}
        </h1>

        <div className="mt-6 space-y-2">
          <p><strong>Skills:</strong> {internship.skill}</p>
          <p><strong>Location:</strong> {internship.location}</p>
          <p><strong>Duration:</strong> {internship.duration}</p>
          <p><strong>Stipend:</strong> ₹{internship.stipend}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg">Description</h3>
          <p className="text-gray-700 mt-2">
            {internship.description}
          </p>
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
            {isSaved ? "Saved" : "Save Internship"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternDetailsPage;
