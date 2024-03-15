// ViewJobApplicant.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EmNavbar from '../EmNavbar';
import { fetchStudentDetails } from '../../store/userActions'; // Import fetchStudentDetails action

const ViewJobApplicant = () => {
    const dispatch = useDispatch();
    const { studentId } = useParams(); // Get the studentId parameter from the route
    const studentDetails = useSelector(state => state.user.studentDetails?.[studentId]); // Use optional chaining
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(state=> state.user)
    console.log(user)
    useEffect(() => {
        // Fetch student details when component mounts
        dispatch(fetchStudentDetails(studentId))
            .then(() => setIsLoading(false))
            .catch(error => {
                console.error('Error fetching student details:', error);
                setIsLoading(false);
            });
    }, [dispatch, studentId]);
   

    return (
        <div className='w-full min-h-[100vh] bg-zinc-100 overflow-hidden'>
        <EmNavbar/>
        <h1 className='text-center text-3xl p-10 font-semibold'>Resume</h1>
        <div className='Formdiv min-h-[100vh] border-2 w-[80%] m-auto p-10'>
          <div className='personal  border-b-2 pb-2'>
            <h1 className='text-3xl font-semibold mb-2'>
              {studentDetails && studentDetails.firstname} {studentDetails && studentDetails.lastname}{' '}
              
            </h1>
            <h4>{studentDetails && studentDetails.email}</h4>
            <h4>+91 {studentDetails && studentDetails.contact}</h4>
            <h4>{studentDetails && studentDetails.city}</h4>
          </div>
          <div className='edu border-b-2 py-4 flex'>
            <h3 className=''>EDUCATION</h3>
            <div className='w-full ml-[30vh] '>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.education.map((education, index) => (
                  <div key={index} className='education-item mb-4'>
                   
                      <>
                        <h2 className='font-semibold'>{education.degree || education.type}, {education.stream || education.board}</h2>
                        <p>{education.college || education.school}</p>
                        <p>{education.startYear} - {education.endYear} {education.yearofcompl}</p>
                        <p>CGPA: {education.percentage}</p>
                      </>
                  </div>
                ))}
            </div>
          </div>
          <div className='edu  border-b-2 py-4 flex'>
            <h3 className=''>WORK EXPERIENCE</h3>
            <div className='w-full ml-[30vh] '>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.jobs.map((job, index) => (
                  <div key={index} className='education-item mb-4'>
                    
                      <>
                        <h2 className='font-semibold'>{job.profile || job.type} {job.stream || job.board}</h2>
                        <p className='mt-1'>{job.organization}, {job.location}</p>
                        <p className='mt-1'>{job.description}</p>
                        <p className='mt-1'>{job.type}  ({job.startDate} - {job.endDate})</p>
                      </>
                  </div>
                ))}
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.internships.map((internship, index) => (
                  <div key={index} className='education-item mb-4'>
                      <>
                        <h2 className='font-semibold'>{internship.profile || internship.type} {internship.stream || internship.board}</h2>
                        <p className='mt-1'>{internship.organization}, {internship.location}</p>
                        <p className='mt-1'>{internship.type}  ({internship.startDate} - {internship.endDate})</p>
                        <p className='mt-1'>{internship.description}</p>
                      </>
                  </div>
                ))}
            </div>
  
  
  
          </div>
          <div className='edu  border-b-2 py-4 flex'>
            <h3 className=''>POSITIONS OF RESPONSIBILITY</h3>
            <div className='w-full ml-[20vh]'>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.responsibilities.map((respo, index) => (
                  <div key={index} className='education-item mb-4'>
                      <>
                        <h2 className='font-semibold'>{respo.description}</h2>
                      </>
                  </div>
                ))}
            </div>
          </div>
          <div className='edu  border-b-2 py-4 flex'>
            <h3 className=''>TRAININGS/ COURSES</h3>
            <div className='w-full ml-[27vh]'>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.courses.map((course, index) => (
                  <div key={index} className='education-item mb-4'>
                      <>
                        <h2 className='font-semibold'>{course.program}</h2>
                        <p className='mt-1'>
                          {course.organization}, {course.locationType === "Location" ? course.location : course.locationType}
                        </p>
                        <p className=''>({course.startDate}) - ({course.endDate})</p>
                        <p>{course.description}</p>
                      </>
                  </div>
                ))}
            </div>
          </div>
          <div className='edu  border-b-2 py-4 flex'>
            <h3 className=''>PROJECTS</h3>
            <div className='w-full ml-[34vh]'>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.projects.map((project, index) => (
                  <div key={index} className='education-item mb-4'>
                      <>
                        <h2 className='font-semibold'>{project.title}</h2>
  
                        <p className=''>({project.startDate}) - ({project.present === true ? 'Present' : project.endDate})</p>
                        {project.projectLink && (
                          <p className='text-blue-800'>
                            <a href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a>
                          </p>
                        )}
                        <p>{project.description}</p>
                      </>
                  </div>
                ))}
            </div>
          </div>
          <div className='edu  border-b-2 py-4 flex'>
            <h3 className=''>SKILLS</h3>
            <div className='w-full ml-[38vh]'>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.skills.map((skill, index) => (
                  <div key={index} className='education-item mb-4'>
                      <>
                        <h2 className='font-semibold'>{skill.skillName}</h2>
                        <p>{skill.proficiency}</p>
                      </>
                  </div>
                ))}
            </div>
          </div>
          <div className='edu border-b-2 py-4 flex'>
          <h3 className=''>Portfolios / Work Samples</h3>
          <div className='w-full ml-[38vh]'>
            {studentDetails && studentDetails.resume && studentDetails.resume.portfolio ? (
              <div className='education-item mb-4'>
                <h2 className='font-semibold'>Portfolio</h2>
                {/* Iterate over portfolio items and render them */}
                {studentDetails.resume.portfolio.blogLink && (
                  <p>
                    Blog Link:{" "}
                    <a className='text-blue-600' href={studentDetails.resume.portfolio.blogLink}>
                      {studentDetails.resume.portfolio.blogLink}
                    </a>
                  </p>
                )}
                {studentDetails.resume.portfolio.githubProfile && (
                  <p>
                    GitHub Profile:{" "}
                    <a className='text-blue-600' href={studentDetails.resume.portfolio.githubProfile}>
                      {studentDetails.resume.portfolio.githubProfile}
                    </a>
                  </p>
                )}
                {studentDetails.resume.portfolio.playStoreDevAccount && (
                  <p>
                    Play Store Developer Account:{" "}
                    <a className='text-blue-600' href={studentDetails.resume.portfolio.playStoreDevAccount}>
                      {studentDetails.resume.portfolio.playStoreDevAccount}
                    </a>
                  </p>
                )}
                {studentDetails.resume.portfolio.behancePortfolio && (
                  <p>
                    Behance Portfolio:{" "}
                    <a className='text-blue-600' href={studentDetails.resume.portfolio.behancePortfolio}>
                      {studentDetails.resume.portfolio.behancePortfolio}
                    </a>
                  </p>
                )}
                {studentDetails.resume.portfolio.otherWorkSample && (
                  <p>
                    Other Work Sample:{" "}
                    <a className='text-blue-600' href={studentDetails.resume.portfolio.otherWorkSample}>
                      {studentDetails.resume.portfolio.otherWorkSample}
                    </a>
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
          <div className='edu  border-b-2 py-4 flex'>
            <h3 className=''>ACCOMPLISHMENTS</h3>
            <div className='w-full ml-[38vh]'>
              {studentDetails &&
                studentDetails.resume &&
                studentDetails.resume.accomplishments.map((accomplishment, index) => (
                  <div key={index} className='education-item mb-4'>
                      <>
                        <h2 className='font-semibold'>{accomplishment.accom}</h2>
                        {/* <p>{skill.proficiency}</p> */}
  
                        
                      </>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ViewJobApplicant;
