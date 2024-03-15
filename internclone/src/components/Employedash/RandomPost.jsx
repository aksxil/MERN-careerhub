// RandomPost.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncloademploye, fetchJobDetails } from '../../store/userActions';

const RandomPost = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  useEffect(() => {
    // Fetch job details for each job reference
    if (user.user.jobs) {
      user.user.jobs.forEach(jobId => {
        dispatch(fetchJobDetails(jobId)); // Dispatch action to fetch job details
      });
    }
  }, [dispatch, user.user.jobs]);

  return (
    <div className='mt text-center mt-[15vh]'>
      <h2 className='text-3xl'>Jobs</h2>
      <div className='min-h-[30vh] w-full flex  flex-wrap mt-10 justify-center'>
        {user.user.jobs && user.user.jobs.map((jobId, index) => {
          const jobDetails = user.jobDetails[jobId];
          return (
            <div key={index}>
              {jobDetails && (
                <div className='min-h-[20vh] w-[70vw] bg-[#F4F4F5] border-b border-black mb-3 rounded-lg shadow-md flex flex-col items-start p-5'>
                  <h3 className='text-xl font-semibold'>{jobDetails.job.title}</h3>
                  {/* <p>Description: {jobDetails.job.description}</p> */}
                  <p>Skills: {jobDetails.job.skills}</p>
                  {/* Use Link component to navigate to ViewJob route */}
                  <Link to={`/view-job/${jobId}`} className='mt-4 px-4 py-2 rounded-md bg-sky-500 text-white'>View/Edit Job</Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RandomPost;
