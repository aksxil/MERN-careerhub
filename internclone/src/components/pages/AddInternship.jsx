import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInternship, asyncloaduser } from '../../store/userActions';

const AddInternship = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    profile: '',
    organization: '',
    location: '',
    remoteOrOffice: '',
    startDate: '',
    endDate: '',
    description: '',
    type:'Internship'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., dispatching an action to add the internship
    dispatch(addInternship(formData))
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="w-[70%]  m-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Internship</h2>
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
       <div className='flex gap-20'>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Remote or In Office</label>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="remoteOrOffice"
                value="Remote"
                checked={formData.remoteOrOffice === 'Remote'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Remote</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="remoteOrOffice"
                value="In Office"
                checked={formData.remoteOrOffice === 'In Office'}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">In Office</span>
            </label>
          </div>
        </div>
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
            rows="1"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter description"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
          Submit
        </button>
        <button type="button" onClick={onClose} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddInternship;
