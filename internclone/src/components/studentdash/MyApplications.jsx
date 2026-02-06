import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import { fetchMyApplications, asyncloaduser } from "../../store/userActions";

const MyApplications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloaduser());
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const appliedJobs = useSelector((state) => state.user.jobDetails);
  const appliedInternships = useSelector(
    (state) => state.user.internshipDetails
  );
  const user = useSelector((state) => state.user.user);
  const studentId = user?._id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-12">
          My Applications
        </h1>

        {/* INTERNSHIPS */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Applied Internships
          </h2>

          <div className="space-y-6">
            {Object.values(appliedInternships || {}).length === 0 && (
              <p className="text-gray-500">
                You haven’t applied to any internships yet.
              </p>
            )}

            {Object.values(appliedInternships || {}).map(
              (internship) => {
                const shortlisted =
                  internship.shortlistedStudents?.includes(
                    studentId
                  );

                return (
                  <div
                    key={internship._id}
                    className="bg-white rounded-2xl shadow-sm border p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {internship.profile}
                        </h3>
                        <p className="text-gray-500 mt-1">
                          {internship.employe?.organizationname}
                        </p>
                      </div>

                      <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                        Internship
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        Applied
                      </span>
                      <span>
                        <i className="ri-group-line"></i>{" "}
                        {internship.students?.length} applicants
                      </span>
                    </div>

                    <div className="mt-6">
                      {shortlisted ? (
                        <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg">
                          🎉 You are shortlisted
                        </span>
                      ) : (
                        <span className="text-indigo-600 font-medium">
                          Application under review
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* JOBS */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Applied Jobs
          </h2>

          <div className="space-y-6">
            {Object.values(appliedJobs || {}).length === 0 && (
              <p className="text-gray-500">
                You haven’t applied to any jobs yet.
              </p>
            )}

            {Object.values(appliedJobs || {}).map((job) => {
              const shortlisted =
                job.shortlistedStudents?.includes(studentId);

              return (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-sm border p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {job.title}
                      </h3>
                      <p className="text-gray-500 mt-1">
                        {job.employe?.organizationname}
                      </p>
                    </div>

                    <span className="px-4 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-600">
                      Job
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      Applied
                    </span>
                    <span>
                      <i className="ri-group-line"></i>{" "}
                      {job.students?.length} applicants
                    </span>
                  </div>

                  <div className="mt-6">
                    {shortlisted ? (
                      <span className="inline-block bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg">
                        🎉 You are shortlisted
                      </span>
                    ) : (
                      <span className="text-indigo-600 font-medium">
                        Application submitted
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyApplications;
