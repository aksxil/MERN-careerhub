import React, { useEffect, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchSavedJobsAndInternships, removeSavedItemAsync } from '../../store/userActions';
import Navbar from '../Navbar'
import { Link } from 'react-router-dom';

const SavedItemsPage = () => {
  Link
  const dispatch = useDispatch();
  const { savedJobs, savedInternships, loading, error } = useSelector(state => state.user);
  const userId = useSelector(state => state.user?.user?._id);

  useEffect(() => {
    console.log("userId:", userId); // Log userId to check its value
    if (userId) {
      dispatch(fetchSavedJobsAndInternships(userId));
    }
  }, [dispatch, userId]); // Ensure userId is in the dependency array
  

  const handleRemoveSavedItem = (itemType, itemId) => {
    dispatch(removeSavedItemAsync(userId, itemType, itemId));
    toast.success('Successfully Removed');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='min-h-screen  pb-10'>
      <Navbar/>
      <h2 className='text-center text-3xl m-10 font-semibold bg-sky-100'>Saved Jobs</h2>
      <ul className='flex items-center justify-center'>
        {savedJobs.map(job => (
          <div className="job-card min-h-[52vh] w-[48vh] bg-white rounded-lg p-3">
          <h1 className='border flex items-center gap-2 font-semibold text-slate-400'><span className='text-xl text-sky-500 '><i className="ri-funds-line"></i></span> Actively hiring</h1>
          <div className="job-details mt-2 flex items-center border-b pb-4">
          <div>
          <h1 className='text-[16px] font-semibold'>{job.title}</h1>
           <h2 className='text-[14px]'>{job.employe.organizationname}</h2>
          </div>
          <img className='h-20' src={job.employe.organizationLogo.url} alt="" />
          </div>
          <h3 className='mt-1 text-sm'><i className="ri-map-pin-2-line"></i> Work From {job.jobtype}</h3>
          <h3 className='mt-1 text-sm'><i className="ri-map-pin-2-line"></i> Location: {job.location}</h3>
          <h5 className='mt-1 text-sm'><i className="ri-money-rupee-circle-line"></i> {job.salary}/month</h5>
          <div className='flex w-full justify-between items-center mt-[40px]'>
            <h5 className='bg-slate-200 px-2 text-sm'>Job</h5>
          <button className='text-sky-500 font-semibold' ><Link to={`/jobs/${job._id}`} className='view-details-link'>View Details <i className="ri-arrow-right-s-line"></i></Link></button>
          </div>
          <button className="remove-btn bg-slate-400 p-1 mt-2 text-white rounded-md" onClick={() => handleRemoveSavedItem('job', job._id)}>Remove</button>
        </div>
        ))}
      </ul>

      <h2 className='text-center text-3xl m-10 font-semibold bg-sky-100'>Saved Internships</h2>
      <ul className='flex items-center justify-center gap-10'>
        {savedInternships.map(internship => (
          <div className="job-card min-h-[52vh] w-[48vh] bg-white rounded-lg p-3">
          <h1 className='border flex items-center gap-2 font-semibold text-slate-400'><span className='text-xl text-sky-500 '><i className="ri-funds-line"></i></span> Actively hiring</h1>
          <div className="job-details mt-2 flex items-center border-b pb-4">
          <div>
          <h1 className='text-[16px] font-semibold'>{internship.title}</h1>
           <h2 className='text-[14px]'>{internship.employe.organizationname}</h2>
          </div>
          <img className='h-20' src={internship.employe.organizationLogo.url} alt="" />
          </div>
          <h3 className='mt-1 text-sm'><i className="ri-map-pin-2-line"></i> Work From {internship.internshiptype}</h3>
          <h3 className='mt-1 text-sm'><i className="ri-map-pin-2-line"></i> Location: {internship.location}</h3>
          <h5 className='mt-1 text-sm'><i className="ri-money-rupee-circle-line"></i> {internship.salary}/month</h5>
          <div className='flex w-full justify-between items-center mt-[40px]'>
            <h5 className='bg-slate-200 px-2 text-sm'>internship</h5>
          <button className='text-sky-500 font-semibold'><Link to={`/internships/${internship._id}`} className='view-details-link'>View Details <i className="ri-arrow-right-s-line"></i></Link></button>
         
         
          
          </div>
          <button className="remove-btn bg-slate-400 p-1 mt-2  text-white rounded-md" onClick={() => handleRemoveSavedItem('internship', internship._id, userId)}>Remove</button>
        </div>
        ))}
      </ul>
    </div>
  );
};

export default SavedItemsPage;
