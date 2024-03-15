import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { fetchInternshipDetails, updateInternshipPost } from '../../store/userActions';

const EditInternshipPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const { internshipId } = useParams();
  const internshipDetails = useSelector(state => state.user.internshipDetails[internshipId]);

  const [formData, setFormData] = useState({
    profile: '',
    skill: '',
    internshiptype: '',
    openings: 0,
    from: '',
    to: '',
    duration: '',
    responsibility: '',
    perks: '',
    stipendStatus: '',
    stipendAmount: 0,
    assesments: '',
    location:''
  });

  useEffect(() => {
    dispatch(fetchInternshipDetails(internshipId));
  }, [dispatch, internshipId]);

  useEffect(() => {
    if (internshipDetails) {
      setFormData({
        profile: internshipDetails.profile || '',
        skill: internshipDetails.skill || '',
        internshiptype: internshipDetails.internshiptype || '',
        openings: internshipDetails.openings || 0,
        from: internshipDetails.from || '',
        to: internshipDetails.to || '',
        duration: internshipDetails.duration || '',
        responsibility: internshipDetails.responsibility || '',
        perks: internshipDetails.perks || '',
        stipendStatus: internshipDetails.stipend.status || '',
        stipendAmount: internshipDetails.stipend.amount || 0,
        assesments: internshipDetails.assesments || '',
        location: internshipDetails.location || ''
      });
    }
  }, [internshipDetails]);

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateInternshipPost(internshipId, formData));
    onClose();
    toast.success('Job Post Updated');
  };

  return (
    <div className='min-h-screen w-[80%] absolute top-20 left-[25vh] bg-gray-200 bg-opacity-90'>
      <div className='bg-white p-6 rounded-lg'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>Edit Internship</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-900 focus:outline-none'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div>
            <label className='block mb-1'>Profile</label>
            <input type='text' value={formData.profile} onChange={(e) => handleInputChange(e, 'profile')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Skills</label>
            <input type='text' value={formData.skill} onChange={(e) => handleInputChange(e, 'skill')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Internship Type</label>
            <select value={formData.internshiptype} onChange={(e) => handleInputChange(e, 'internshiptype')} className='w-full p-2 border rounded-md'>
              <option value='In office'>In office</option>
              <option value='Remote'>Remote</option>
            </select>
          </div>
          <div>
            <label className='block mb-1'>Location</label>
            <input type='text' value={formData.location} onChange={(e) => handleInputChange(e, 'location')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Openings</label>
            <input type='number' value={formData.openings} onChange={(e) => handleInputChange(e, 'openings')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>From</label>
            <input type='date' value={formData.from} onChange={(e) => handleInputChange(e, 'from')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>To</label>
            <input type='date' value={formData.to} onChange={(e) => handleInputChange(e, 'to')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Duration</label>
            <input type='text' value={formData.duration} onChange={(e) => handleInputChange(e, 'duration')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Responsibility</label>
            <textarea value={formData.responsibility} onChange={(e) => handleInputChange(e, 'responsibility')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
            <label className='block mb-1'>Perks</label>
            <textarea value={formData.perks} onChange={(e) => handleInputChange(e, 'perks')} className='w-full p-2 border rounded-md' />
          </div>
          <div>
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
          </div>
          <div>
            <label className='block mb-1'>Assessments</label>
            <textarea value={formData.assesments} onChange={(e) => handleInputChange(e, 'assesments')} className='w-full p-2 border rounded-md' />
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'>
              Update Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInternshipPost;
