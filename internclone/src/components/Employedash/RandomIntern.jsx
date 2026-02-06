import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  asyncloademploye,
  fetchInternshipDetails,
} from "../../store/userActions";

const RandomIntern = () => {
  const dispatch = useDispatch();

  const { user, internshipDetails } = useSelector(
    (state) => state.user
  );

  // Load employer profile
  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  // Fetch internship details only if not already present
  useEffect(() => {
    if (!user?.internships) return;

    user.internships.forEach((id) => {
      if (!internshipDetails[id]) {
        dispatch(fetchInternshipDetails(id));
      }
    });
  }, [dispatch, user?.internships, internshipDetails]);

  if (!user?.internships || user.internships.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No internships posted yet
      </div>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Internships
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto px-4">
        {user.internships.map((internshipId) => {
          const internship = internshipDetails[internshipId];
          if (!internship) return null;

          return (
            <div
              key={internshipId}
              className="bg-white border rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {internship.profile}
                </h3>
                <p className="text-sm text-gray-500">
                  Skills: {internship.skill || "Not specified"}
                </p>
              </div>

              <Link
                to={`/view-internship/${internshipId}`}
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

export default RandomIntern;
