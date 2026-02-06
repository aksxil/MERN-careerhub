import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const {
    title,
    salary,
    employe,
    _id,
    jobtype,
    location,
  } = job;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">

      {/* TOP BADGE */}
      <div className="inline-flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
        <i className="ri-flashlight-line"></i>
        Actively Hiring
      </div>

      {/* JOB + COMPANY */}
      <div className="flex justify-between items-start mt-4 pb-4 border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {employe?.organizationname}
          </p>
        </div>

        <div className="h-14 w-14 rounded-lg overflow-hidden border bg-gray-50 flex items-center justify-center">
          <img
            src={employe?.organizationLogo?.url}
            alt="company"
            className="object-contain h-full w-full"
          />
        </div>
      </div>

      {/* JOB META */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <i className="ri-briefcase-line text-indigo-500"></i>
          Work From <span className="font-medium">{jobtype}</span>
        </p>

        <p className="flex items-center gap-2">
          <i className="ri-map-pin-line text-indigo-500"></i>
          {location}
        </p>

        <p className="flex items-center gap-2">
          <i className="ri-money-rupee-circle-line text-indigo-500"></i>
          <span className="font-medium">{salary}</span> / month
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
          Job
        </span>

        <Link
          to={`/jobs/${_id}`}
          className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
        >
          View Details
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
