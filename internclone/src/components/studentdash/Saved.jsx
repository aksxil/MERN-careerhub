import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchSavedJobsAndInternships,
  removeSavedItemAsync,
} from "../../store/userActions";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const SavedItemsPage = () => {
  const dispatch = useDispatch();
  const { savedJobs, savedInternships, loading, error, user } =
    useSelector((state) => state.user);

  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchSavedJobsAndInternships(userId));
    }
  }, [dispatch, userId]);

  const handleRemove = (type, id) => {
    dispatch(removeSavedItemAsync(userId, type, id));
    toast.success("Removed from saved");
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-gray-500">Loading saved items...</p>
        </div>
      </>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* SAVED JOBS */}
        <section>
          <h2 className="text-3xl font-semibold mb-8">
            Saved Jobs
          </h2>

          {savedJobs.length === 0 ? (
            <p className="text-gray-500">
              You haven’t saved any jobs yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition border"
                >
                  <div className="flex justify-between items-start pb-4 border-b">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {job.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {job.employe?.organizationname}
                      </p>
                    </div>

                    <img
                      src={job.employe?.organizationLogo?.url}
                      alt="logo"
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <i className="ri-briefcase-line text-indigo-500"></i>{" "}
                      {job.jobtype}
                    </p>
                    <p>
                      <i className="ri-map-pin-line text-indigo-500"></i>{" "}
                      {job.location}
                    </p>
                    <p>
                      <i className="ri-money-rupee-circle-line text-indigo-500"></i>{" "}
                      ₹{job.salary}/month
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="text-indigo-600 font-semibold text-sm"
                    >
                      View Details →
                    </Link>

                    <button
                      onClick={() => handleRemove("job", job._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SAVED INTERNSHIPS */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-8">
            Saved Internships
          </h2>

          {savedInternships.length === 0 ? (
            <p className="text-gray-500">
              You haven’t saved any internships yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedInternships.map((internship) => (
                <div
                  key={internship._id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition border"
                >
                  <div className="flex justify-between items-start pb-4 border-b">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {internship.profile}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {internship.employe?.organizationname}
                      </p>
                    </div>

                    <img
                      src={internship.employe?.organizationLogo?.url}
                      alt="logo"
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <i className="ri-briefcase-line text-indigo-500"></i>{" "}
                      {internship.internshiptype}
                    </p>
                    <p>
                      <i className="ri-map-pin-line text-indigo-500"></i>{" "}
                      {internship.location}
                    </p>
                    <p>
                      <i className="ri-money-rupee-circle-line text-indigo-500"></i>{" "}
                      ₹{internship.stipend?.amount}/month
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/internships/${internship._id}`}
                      className="text-indigo-600 font-semibold text-sm"
                    >
                      View Details →
                    </Link>

                    <button
                      onClick={() =>
                        handleRemove("internship", internship._id)
                      }
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SavedItemsPage;
