import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmNavbar from "../EmNavbar";
import { fetchStudentDetails } from "../../store/userActions";

const Section = ({ title, children }) => (
  <div className="border-b py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
    <h3 className="font-semibold text-gray-700">{title}</h3>
    <div className="md:col-span-3 space-y-4">{children}</div>
  </div>
);

const ViewJobApplicant = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();

  const student = useSelector(
    (state) => state.user.studentDetails?.[studentId]
  );

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentDetails(studentId));
    }
  }, [dispatch, studentId]);

  if (!student) {
    return (
      <div>
        <EmNavbar />
        <p className="text-center mt-10 text-gray-500">
          Loading applicant resume...
        </p>
      </div>
    );
  }

  const resume = student.resume || {};

  return (
    <div className="min-h-screen bg-gray-100">
      <EmNavbar />

      <h1 className="text-center text-3xl font-semibold py-8">
        Applicant Resume
      </h1>

      <div className="bg-white max-w-5xl mx-auto rounded-lg shadow p-8">

        {/* PERSONAL */}
        <div className="border-b pb-6 mb-6">
          <h2 className="text-2xl font-semibold">
            {student.firstname} {student.lastname}
          </h2>
          <p>{student.email}</p>
          <p>+91 {student.contact}</p>
          <p>{student.city}</p>
        </div>

        {/* EDUCATION */}
        <Section title="EDUCATION">
          {resume.education?.length ? (
            resume.education.map((edu, i) => (
              <div key={i}>
                <h4 className="font-semibold">
                  {edu.degree || edu.type}, {edu.stream || edu.board}
                </h4>
                <p>{edu.college || edu.school}</p>
                <p>
                  {edu.startYear} - {edu.endYear || edu.yearofcompl}
                </p>
                <p>CGPA / %: {edu.percentage}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No education details</p>
          )}
        </Section>

        {/* EXPERIENCE */}
        <Section title="WORK EXPERIENCE">
          {resume.jobs?.length ? (
            resume.jobs.map((job, i) => (
              <div key={i}>
                <h4 className="font-semibold">{job.profile}</h4>
                <p>{job.organization}, {job.location}</p>
                <p>{job.description}</p>
                <p>
                  {job.startDate} - {job.endDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No work experience</p>
          )}

          {resume.internships?.map((intern, i) => (
            <div key={i}>
              <h4 className="font-semibold">{intern.profile}</h4>
              <p>{intern.organization}, {intern.location}</p>
              <p>{intern.description}</p>
            </div>
          ))}
        </Section>

        {/* SKILLS */}
        <Section title="SKILLS">
          {resume.skills?.length ? (
            resume.skills.map((s, i) => (
              <p key={i}>
                <b>{s.skillName}</b> — {s.proficiency}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No skills added</p>
          )}
        </Section>

        {/* PROJECTS */}
        <Section title="PROJECTS">
          {resume.projects?.length ? (
            resume.projects.map((p, i) => (
              <div key={i}>
                <h4 className="font-semibold">{p.title}</h4>
                <p>
                  {p.startDate} - {p.present ? "Present" : p.endDate}
                </p>
                {p.projectLink && (
                  <a
                    href={p.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    {p.projectLink}
                  </a>
                )}
                <p>{p.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects listed</p>
          )}
        </Section>

        {/* ACCOMPLISHMENTS */}
        <Section title="ACCOMPLISHMENTS">
          {resume.accomplishments?.length ? (
            resume.accomplishments.map((a, i) => (
              <p key={i}>{a.accom}</p>
            ))
          ) : (
            <p className="text-gray-500">No accomplishments</p>
          )}
        </Section>
      </div>
    </div>
  );
};

export default ViewJobApplicant;
