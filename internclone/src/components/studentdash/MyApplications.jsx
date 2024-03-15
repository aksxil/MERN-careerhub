import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar';
import { fetchMyApplications, asyncloaduser } from '../../store/userActions';

const MyApplications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloaduser());
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const appliedJobs = useSelector(state => state.user.jobDetails);
  const appliedInternships = useSelector(state => state.user.internshipDetails);
  const user = useSelector(state => state.user.user);
  const StudentId = user ? user._id : null;

  // const isJobShortlisted = (job, studentId) => {
  //   return job.shortlistedStudents.includes(studentId);
  // };

  // const isInternshipShortlisted = (internship, studentId) => {
  //   return internship.shortlistedStudents.includes(studentId);
  // };

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="p-8">
        <h2 className="text-3xl font-semibold mb-10 text-center">My Applications</h2>

        {/* Render applied internships */}
        <div>
          <ul>
            {Object.values(appliedInternships).map(internship => (
              <div key={internship.id} className='min-h-[25vh] mt-8 w-[70vw] mx-auto  border border-[gray] rounded-md py-2 px-3'>
                <h1>{internship.employe.firstname}</h1>
                <h1 className='text-xl font-semibold'>Aksxil Web</h1>
                <h4 className='opacity-[80%]'>{internship.profile}</h4>
                <div className='flex items-center mt-5 gap-3'>
                    <h3 className='text-sky-500 font-semibold bg-sky-100 inline-block px-4 py-[2px]  rounded-[20px]'>Applied</h3>
                    <h3>Internship</h3>
                    <h3 className='opacity-[80%]'><i className="ri-group-fill"></i> {internship.students.length} Applicants</h3>
                </div>
                <div className='h-10 w-full border-t-2 mt-5'>
                   <button className={internship.shortlistedStudents.includes(StudentId) ? "bg-green-400 text-white font-semibold mt-2 border-2 rounded-md p-1 border-green-500" : "text-sky-500 font-semibold mt-2"}>{internship.shortlistedStudents.includes(StudentId) ? "You Are Shortlisted" : "Review application"}</button>
                </div>
              </div>
            ))}
          </ul>
        </div>

        {/* Render applied jobs */}
        <div>
          <ul>
            {Object.values(appliedJobs).map(job => (
               <div key={job.id} className='min-h-[25vh] mt-8 w-[70vw] mx-auto  border border-[gray] rounded-md py-2 px-3'>
               <h1 className='text-xl font-semibold'>{job.employe.organizationname}</h1>
               <h4 className='opacity-[80%]'>{job.title}</h4>
               <div className='flex items-center mt-5 gap-3'>
                   <h3 className='text-sky-500 font-semibold bg-sky-100 inline-block px-4 py-[2px]  rounded-[20px]'>Applied</h3>
                   <h3>Job</h3>
                   <h3 className='opacity-[80%]'><i className="ri-group-fill"></i> {job.students.length} Applicants</h3>
               </div>
               <div className='h-10 w-full border-t-2 mt-5'>
               <button className={job.shortlistedStudents.includes(StudentId) ? "bg-green-400 text-white font-semibold mt-2 border-2 rounded-md p-1 border-green-500" : "text-sky-500 font-semibold mt-2"}>{job.shortlistedStudents.includes(StudentId) ? "You Are Shortlisted" : "Application Submited"}</button>
                </div>
             </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
