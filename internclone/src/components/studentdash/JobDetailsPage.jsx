import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { applyForJob, fetchJobDetailsStu, asyncloaduser, saveJobInternship } from '../../store/userActions'; // Import the action for saving job or internship
import Navbar from '../Navbar';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // State variable to track if the job is saved by the student

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const job = useSelector(state => state.user.jobDetails[jobId]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (jobId && !job) {
      dispatch(fetchJobDetailsStu(jobId));
    }
  }, [dispatch, jobId, job]);

  useEffect(() => {
    // Check if the job and user data is available and then update isAlreadyApplied state accordingly
    if (job && job.data && user.isAuthenticated && user.user) {
      const appliedStudents = job.data.students;
      const isAlreadyApplied = appliedStudents.includes(user.user._id);
      setIsAlreadyApplied(isAlreadyApplied);
    }
  }, [job, user]);

  useEffect(() => {
    // Check if the job ID is included in the savedJobs array of the user
    if (user.isAuthenticated && user.user && user.user.savedJobs.includes(jobId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [user, jobId]);

  const handleApply = () => {
    dispatch(applyForJob(jobId)).then(() => {
      setIsAlreadyApplied(true);
      toast.success('Applied Successfully');
    });
  };

  const handleSave = () => {
    // Dispatch action to save the job
    dispatch(saveJobInternship(user.user._id, jobId, 'job')).then(() => {
      setIsSaved(true); // Update state to reflect that the job is saved
      toast.success('Save Job Successfully');
      
    }).catch(() => {
      setIsSaved(false); // Handle error in case save fails
    });
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const { title, description, jobtype, salary, perks, openings, preferences, skills, responsibility, assesments } = job.data;

  return (
    <div className="min-h-screen w-full pb-[20vh]">
      <Navbar />
      <h2 className="text-3xl p-8 font-semibold text-center">{title} ({jobtype})</h2>
      <div className="min-h-screen w-[85%] m-auto border-2 px-5 py-10">
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-2">Job-Type {jobtype}</p>
        <p className="mt-1"><span className="font-semibold">Salary:</span> {salary}/month</p>
        <p className="mt-1"><span className="font-semibold">Perks:</span> {perks}</p>
        <p className="mt-1"><span className="font-semibold">Skills:</span> <span className="text-sky-500">{skills}</span></p>
        <p className="mt-1"><span className="text-sky-500 font-semibold">Openings:</span> {openings}</p>
        <p className="mt-5"><span className="font-semibold">Preferences:</span> {preferences}</p>
        <p className="mt-5"><span className="font-semibold">Responsibility:</span> {responsibility}</p>
        <p className="mt-5"><span className="font-semibold">Description:</span> {description}</p>
        <p className="mt-5"><span className="font-semibold">Assesments:</span> {assesments}</p>
        {!isAlreadyApplied && user.isAuthenticated && (
          <button onClick={handleApply} className="px-10 py-2 bg-sky-500 text-xl text-white rounded-md ml-[42%] mt-10">Apply Now</button>
        )}
        {isAlreadyApplied && user.isAuthenticated && (
          <p className="mt-5 text-red-500 font-semibold">Already Applied</p>
        )}
        {!isSaved && user.isAuthenticated && (
          <button onClick={handleSave} className="px-10 py-2 bg-blue-500 text-xl text-white rounded-md ml-[42%] mt-5">Save Job</button>
        )}
        {isSaved && user.isAuthenticated && (
          <p className="mt-5 text-green-500 font-semibold">Job Saved</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailsPage;
