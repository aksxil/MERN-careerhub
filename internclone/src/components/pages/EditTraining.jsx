import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, updateTraing } from '../../store/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditTraining = ({ trainingData, onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
      // Fetch user details when the component mounts
      dispatch(asyncloaduser());
    }, [dispatch]);

  const [formData, setFormData] = useState({
    // trainingProgram: trainingData.program,
    organization: trainingData.organization,
    locationType: trainingData.locationType,
    location: trainingData.location,
    startDate: trainingData.startDate,
    endDate: trainingData.endDate,
    description: trainingData.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTraing(trainingData.id, formData));
      onClose();
      toast.success('Training or Course updated successfully');
    } catch (error) {
      toast.error('Error updating job');
    }
  };

  return (
    <div className="w-[70%] fixed top-10 left-[25vh] m-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Training</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-20'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Training Program</label>
          <input
            type="text"
            name="trainingProgram"
            value={formData.trainingProgram}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter training program"
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
        <div className='flex gap-40'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Online or Location</label>
          <select
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Online">Online</option>
            <option value="Location">Location</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{formData.locationType === 'Location' ? 'Location' : 'Online Link'}</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder={formData.locationType === 'Location' ? 'Enter location' : 'Enter online link'}
          />
        </div>
        </div>
        <div className='flex gap-28'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
            Save Changes
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTraining;
