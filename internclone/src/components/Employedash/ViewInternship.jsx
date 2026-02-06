import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmNavbar from "../EmNavbar";
import {
  asyncloademploye,
  fetchInternshipDetails,
  deleteInternshipPost,
  fetchStudentDetails,
  addShortlistedStudentInternship,
} from "../../store/userActions";
import EditInternshipPost from "./EditInternshipPost";

const ViewInternship = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { internshipId } = useParams();

  const internship = useSelector(
    (state) => state.user.internshipDetails[internshipId]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});
  const [shortlisted, setShortlisted] = useState([]);

  /* Load internship */
  useEffect(() => {
    dispatch(asyncloademploye());
    dispatch(fetchInternshipDetails(internshipId));
  }, [dispatch, internshipId]);

  /* Load students once */
  useEffect(() => {
    if (!internship?.students) return;

    internship.students.forEach((id) => {
      if (!studentDetails[id]) {
        dispatch(fetchStudentDetails(id)).then((res) => {
          if (res) {
            setStudentDetails((prev) => ({ ...prev, [id]: res }));
          }
        });
      }
    });
  }, [dispatch, internship?.students]);

  /* Sync shortlisted */
  useEffect(() => {
    if (internship?.shortlistedStudents) {
      setShortlisted(internship.shortlistedStudents);
    }
  }, [internship]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this internship?")) return;

    await dispatch(deleteInternshipPost(internshipId));
    toast.success("Internship deleted");
    navigate("/employe/dashboard");
  };

  const handleShortlist = async (studentId) => {
    if (shortlisted.includes(studentId)) return;

    await dispatch(addShortlistedStudentInternship(internshipId, studentId));
    setShortlisted((prev) => [...prev, studentId]);
    toast.success("Student shortlisted");
  };

  if (!internship) {
    return (
      <div>
        <EmNavbar />
        <p className="text-center mt-10">Loading internship...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <EmNavbar />

      <h2 className="text-3xl text-center p-6 font-semibold">
        {internship.profile} ({internship.internshiptype})
      </h2>

      <div className="w-[85%] mx-auto border rounded-lg p-6">
        <p><b>Location:</b> {internship.location}</p>
        <p><b>Stipend:</b> ₹{internship.stipend.amount}/month</p>
        <p><b>Skills:</b> <span className="text-sky-500">{internship.skill}</span></p>
        <p><b>Duration:</b> {internship.duration}</p>
        <p><b>Openings:</b> {internship.openings}</p>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Internship
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Internship
          </button>
        </div>

        <h3 className="text-xl mt-8 mb-3">Applicants</h3>

        {internship.students.map((id) => (
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
        <EditInternshipPost
          internshipId={internshipId}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ViewInternship;
