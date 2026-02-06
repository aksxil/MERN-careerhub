import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";
import {
  asyncloademploye,
  fetchJobDetails,
  deleteJobPost,
  fetchStudentDetails,
  addShortlistedStudent,
} from "../../store/userActions";
import EditJobPost from "./EditJobPost";

const ViewJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobId } = useParams();

  const jobDetails = useSelector(
    (state) => state.user.jobDetails[jobId]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [shortlisted, setShortlisted] = useState([]);

  /* Load job */
  useEffect(() => {
    dispatch(asyncloademploye());
    dispatch(fetchJobDetails(jobId));
  }, [dispatch, jobId]);

  /* Load students (only missing ones) */
  useEffect(() => {
    if (!jobDetails?.job?.students) return;

    jobDetails.job.students.forEach((id) => {
      if (!studentDetails[id]) {
        dispatch(fetchStudentDetails(id)).then((res) => {
          if (res) {
            setStudentDetails((prev) => ({ ...prev, [id]: res }));
          }
        });
      }
    });
  }, [dispatch, jobDetails?.job?.students]);

  /* Sync shortlisted */
  useEffect(() => {
    if (jobDetails?.job?.shortlistedStudents) {
      setShortlisted(jobDetails.job.shortlistedStudents);
    }
  }, [jobDetails]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this job post?")) return;

    await dispatch(deleteJobPost(jobId));
    toast.success("Job deleted successfully");
    navigate("/employe/dashboard");
  };

  const handleShortlist = async (studentId) => {
    if (shortlisted.includes(studentId)) return;

    await dispatch(addShortlistedStudent(jobId, studentId));
    setShortlisted((prev) => [...prev, studentId]);
    toast.success("Student shortlisted");
  };

  if (!jobDetails) {
    return (
      <div>
        <EmNavbar />
        <p className="text-center mt-10">Loading job details...</p>
      </div>
    );
  }

  const job = jobDetails.job;

  return (
    <div className="min-h-screen">
      <EmNavbar />

      <h2 className="text-3xl text-center p-6 font-semibold">
        {job.title} ({job.jobtype})
      </h2>

      <div className="w-[85%] mx-auto border rounded-lg p-6">
        <p><b>Location:</b> {job.location}</p>
        <p><b>Salary:</b> ₹{job.salary}/month</p>
        <p><b>Skills:</b> <span className="text-sky-500">{job.skills}</span></p>
        <p><b>Openings:</b> {job.openings}</p>
        <p><b>Preferences:</b> {job.preferences}</p>
        <p><b>Responsibility:</b> {job.responsibility}</p>
        <p><b>Description:</b> {job.description}</p>
        <p><b>Assessments:</b> {job.assesments}</p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Job
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Job
          </button>
        </div>

        <h3 className="text-xl mt-8 mb-3">Applicants</h3>

        {job.students.map((id) => (
          <div key={id} className="flex items-center justify-between border-b py-2">
            <Link to={`/viewJobApplicant/${id}`} className="text-sky-600">
              {studentDetails[id]?.firstname} {studentDetails[id]?.lastname}
            </Link>

            <button
              onClick={() => handleShortlist(id)}
              disabled={shortlisted.includes(id)}
              className={`px-3 py-1 rounded ${
                shortlisted.includes(id)
                  ? "bg-green-500 text-white"
                  : "bg-sky-500 text-white"
              }`}
            >
              {shortlisted.includes(id) ? "Shortlisted" : "Shortlist"}
            </button>
          </div>
        ))}
      </div>

      {isEditing && (
        <EditJobPost
          jobId={jobId}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ViewJob;
