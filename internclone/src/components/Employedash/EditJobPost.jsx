import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { fetchJobDetails, updateJobPost } from '../../store/userActions'; // Import fetchJobDetails action

const EditJobPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { jobId } = useParams(); // Get the jobId parameter from the route
  const jobDetails = useSelector(state => state.user.jobDetails[jobId]);

  const [formData, setFormData] = useState({
    title: '',
    skills: '',
    jobtype: '',
    openings: 0,
    description: '',
    preferences: '',
    salary: 0,
    perks: '',
    responsibility: '',
    stipendStatus: '',
    stipendAmount: 0,
    assesments: '',
    location: ''
  });

  useEffect(() => {
    // Fetch job details when component mounts
    dispatch(fetchJobDetails(jobId)); // Dispatch fetchJobDetails action
  }, [dispatch, jobId]);

  useEffect(() => {
    // Pre-fill the form fields with existing job details
    if (jobDetails) {
      setFormData({
        title: jobDetails.job.title,
        skills: jobDetails.job.skills,
        jobtype: jobDetails.job.jobtype,
        openings: jobDetails.job.openings,
        description: jobDetails.job.description,
        preferences: jobDetails.job.preferences,
        salary: jobDetails.job.salary,
        perks: jobDetails.job.perks,
        responsibility: jobDetails.job.responsibility,
            // stipendStatus: jobDetails.job.stipend.status,
            // stipendAmount: jobDetails.job.stipend.amount,
        assesments: jobDetails.job.assesments,
        location: jobDetails.job.location
      });
    }
  }, [jobDetails]);

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateJobPost(jobId,formData))
    onClose();
    toast.success('Job Post Updated');
  };

  return (
    <div className='min-h-screen w-[80%] absolute  top-20 left-[25vh] bg-gray-200 bg-opacity-90 '>
      <div className='bg-white p-6 rounded-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>Edit Job Post</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div>
            <label className='block mb-1'>Title</label>
            <input type='text' value={formData.title} onChange={(e) => handleInputChange(e, 'title')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Skills</label>
            <input type='text' value={formData.skills} onChange={(e) => handleInputChange(e, 'skills')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Job Type</label>
            <select value={formData.jobtype} onChange={(e) => handleInputChange(e, 'jobtype')} className='w-full p-2 border rounded-md'>
              <option value='In office'>In office</option>
              <option value='Remote'>Remote</option>
            </select>
          </div>
          <div>
            <label className='block mb-1'>Location: </label>
            <input type='text' value={formData.location} onChange={(e) => handleInputChange(e, 'location')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Openings</label>
            <input type='number' value={formData.openings} onChange={(e) => handleInputChange(e, 'openings')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Description</label>
            <textarea value={formData.description} onChange={(e) => handleInputChange(e, 'description')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Preferences</label>
            <textarea value={formData.preferences} onChange={(e) => handleInputChange(e, 'preferences')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Salary</label>
            <input type='number' value={formData.salary} onChange={(e) => handleInputChange(e, 'salary')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Perks</label>
            <textarea value={formData.perks} onChange={(e) => handleInputChange(e, 'perks')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Responsibilities</label>
            <textarea value={formData.responsibility} onChange={(e) => handleInputChange(e, 'responsibility')} className='w-full p-2 border rounded-md' />
          </div>
          {/* <div>
            <label className='block mb-1'>Stipend Status</label>
            <select value={formData.stipendStatus} onChange={(e) => handleInputChange(e, 'stipendStatus')} className='w-full p-2 border rounded-md'>
              <option value='Fixed'>Fixed</option>
              <option value='Negotiable'>Negotiable</option>
              <option value='Performance Based'>Performance Based</option>
              <option value='Unpaid'>Unpaid</option>
            </select>
          </div>
          <div>
            <label className='block mb-1'>Stipend Amount</label>
            <input type='number' value={formData.stipendAmount} onChange={(e) => handleInputChange(e, 'stipendAmount')} className='w-full p-2 border rounded-md' />
          </div> */}
          <div>
            <label className='block mb-1'>Assessments</label>
            <textarea value={formData.assesments} onChange={(e) => handleInputChange(e, 'assesments')} className='w-full p-2 border rounded-md' />
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
              Update Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPost;
