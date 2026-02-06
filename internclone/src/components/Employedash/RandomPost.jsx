import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  asyncloademploye,
  fetchJobDetails,
} from "../../store/userActions";

const RandomPost = () => {
  const dispatch = useDispatch();

  const { user, jobDetails } = useSelector(
    (state) => state.user
  );

  // Load employer profile
  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  // Fetch job details only if missing
  useEffect(() => {
    if (!user?.jobs) return;

    user.jobs.forEach((jobId) => {
      if (!jobDetails[jobId]) {
        dispatch(fetchJobDetails(jobId));
      }
    });
  }, [dispatch, user?.jobs, jobDetails]);

  if (!user?.jobs || user.jobs.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No jobs posted yet
      </div>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Job Listings
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto px-4">
        {user.jobs.map((jobId) => {
          const job = jobDetails[jobId]?.job;
          if (!job) return null;

          return (
            <div
              key={jobId}
              className="bg-white border rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Skills: {job.skills || "Not specified"}
                </p>
              </div>

              <Link
                to={`/view-job/${jobId}`}
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                View / Edit
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RandomPost;
