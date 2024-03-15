import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, updateJob } from '../../store/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditJob = ({ jobData, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    profile: jobData.profile || '',
    organization: jobData.organization || '',
    location: jobData.location || '',
    startDate: jobData.startDate || '',
    endDate: jobData.endDate || '',
    description: jobData.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateJob(jobData.id, formData));
      onClose();
      toast.success('Job updated successfully');
    } catch (error) {
      toast.error('Error updating job');
    }
  };

  return (
    <div className="w-[70%] m-auto fixed top-10 left-[25vh] p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-20'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Profile</label>
          <input
            type="text"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter profile"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Organization</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter organization"
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter location"
          />
        </div>
        <div className='flex gap-20'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter start date"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="text"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter end date"
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
            Update
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditJob;
