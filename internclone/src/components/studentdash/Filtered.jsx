import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../JobCard";
import InternCard from "../InternCard";
import {
  fetchRandomInternships,
  fetchRandomJobs,
} from "../../store/userActions";

const FilteredJobsAndInternships = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const { randomJobs, randomInternships } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchRandomJobs());
    dispatch(fetchRandomInternships());
  }, [dispatch]);

  // ✅ FIXED FILTER FUNCTION
  const filterItems = (items = []) => {
    return items.filter((item) => {
      const locationMatches =
        !locationFilter ||
        item.jobtype?.toLowerCase() === locationFilter.toLowerCase() ||
        item.internshiptype?.toLowerCase() ===
          locationFilter.toLowerCase();

      const searchMatches =
        !searchQuery ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.profile?.toLowerCase().includes(searchQuery.toLowerCase());

      return locationMatches && searchMatches;
    });
  };

  const filteredJobs = filterItems(randomJobs);
  const filteredInternships = filterItems(randomInternships);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      {/* FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <input
          type="text"
          placeholder="Search jobs & internships"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-3">
          {["", "remote", "in office"].map((type) => (
            <button
              key={type || "all"}
              onClick={() => setLocationFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  locationFilter === type
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {type === ""
                ? "All"
                : type === "remote"
                ? "Remote"
                : "In Office"}
            </button>
          ))}
        </div>
      </div>

      {/* JOBS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Jobs</h2>

        {filteredJobs.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No jobs found matching your criteria
          </p>
        )}
      </section>

      {/* INTERNSHIPS */}
      <section className="mt-14">
        <h2 className="text-2xl font-semibold mb-4">Internships</h2>

        {filteredInternships.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <InternCard
                key={internship._id}
                internship={internship}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No internships found matching your criteria
          </p>
        )}
      </section>
    </div>
  );
};

export default FilteredJobsAndInternships;
