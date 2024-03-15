import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, fetchRandomJobs, fetchRandomInternships } from '../../store/userActions';
import Navbar from '../Navbar';
import JobCard from '../JobCard';
import InternCard from '../InternCard';
import FilteredJobsAndInternships from '../studentdash/Filtered';

const Student = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const randomJobs = useSelector(state => state.user.randomJobs.data);
  const randomInternships = useSelector(state => state.user.randomInternships.data);

  useEffect(() => {
    // Fetch user details and random jobs/internships when the component mounts
    dispatch(asyncloaduser());
    if (!randomJobs) {
      dispatch(fetchRandomJobs());
    }
    if (!randomInternships) {
      dispatch(fetchRandomInternships());
    }
  }, [dispatch, randomJobs, randomInternships]);

  return (
    <div>
      <Navbar />
      
      
      <div>
        {user.isAuthenticated ? (
          <div className='w-full h-[86vh] '>
            {user.user ? (
              <div className="div w-full min-h-40 py-8  text-center">
                <h2 className='text-[7vh] font-semibold'>Hi, {user.user.firstname}!👋</h2>
                <p className='text-lg'>Let’s help you land your dream career</p>
              </div>
            ) : (
              <p>Loading user details...</p>
            )}
            <div className='min-h-[60vh] w-full bg-sky-100 flex flex-col items-center p-5'>
               <FilteredJobsAndInternships/>
              <h1 className='text-3xl font-semibold'>Recommended for you</h1>
              <h2 className='mt-1 text-xl'>as per your <span className='text-sky-600 font-semibold'>preferences</span></h2>
              <div className='min-h-[60vh] w-full bg-sky-100 flex items-center p-10 gap-10'>
                {randomJobs && randomJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              <h2>Random Internships</h2>
              <div className='min-h-[60vh] w-full bg-sky-100 flex items-center p-10 gap-10'>
                {randomInternships && randomInternships.map((internship, index) => (
                  <InternCard key={internship.id} internship={internship}/>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <h2>Please log in to see your details.</h2>
        )}
      </div>
    </div>
  );
};

export default Student;
