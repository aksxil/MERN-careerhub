import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser , addTraining } from '../../store/userActions';

const AddTraining = ({ onClose }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);


  const [formData, setFormData] = useState({
    program: '',
    organization: '',
    locationType: '',
    startDate: '',
    endDate: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTraining(formData))
    onClose();
  };

  return (
    <div className='w-[70%] m-auto p-6 bg-white rounded-md shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Add Training/Course</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-20'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Training Program</label>
          <input
            type='text'
            name='program'
            value={formData.program}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            placeholder='Enter training program'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Organization</label>
          <input
            type='text'
            name='organization'
            value={formData.organization}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            placeholder='Enter organization'
          />
        </div>
        </div>
        <div className='flex gap-20'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Online or Location</label>
          <select
            name='locationType'
            value={formData.locationType}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
          >
            <option value=''>Select location type</option>
            <option value='Online'>Online</option>
            <option value='Location'>Location</option>
          </select>
        </div>
        {formData.locationType === 'Location' && (
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>Location</label>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-gray-300 rounded-md'
              placeholder='Enter location'
            />
          </div>
        )}
        </div>
        <div className='flex gap-20'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Start Date</label>
          <input
            type='date'
            name='startDate'
            value={formData.startDate}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>End Date</label>
          <input
            type='date'
            name='endDate'
            value={formData.endDate}
            onChange={handleChange}
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
          />
        </div>
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows='2'
            className='mt-1 p-2 w-full border border-gray-300 rounded-md'
            placeholder='Enter description'
          ></textarea>
        </div>
        <div className='flex justify-end'>
          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2'>
            Add Training/Course
          </button>
          <button type='button' onClick={onClose} className='bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTraining;
