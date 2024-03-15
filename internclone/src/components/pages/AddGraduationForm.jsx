import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, asyncloaduser } from '../../store/userActions';

const AddGraduationForm = ({ onClose, type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [educationData, setEducationData] = useState({
    college: '',
    startYear: '',
    endYear: '',
    degree: '',
    stream: '',
    percentage: '',
    type: type === 'Postgraduation' ? 'Postgraduation' : 'Graduation', // Automatically set the type
  });

  const handleSubmit = async () => {
    // Check if the user is authenticated before dispatching the action
    if (!user.isAuthenticated) {
      // Handle unauthorized access, such as redirecting to the login page
      console.error('User not authenticated');
      // You can also dispatch an action to set an error message in the state
      // dispatch(setError('User not authenticated'));
      return;
    }
    // Dispatch the addEducation action with the educationData
    dispatch(addEducation(educationData));
    // Reset the form fields or perform any other actions as needed
    setEducationData({
      college: '',
      startYear: '',
      endYear: '',
      degree: '',
      stream: '',
      percentage: '',
      type: type === 'Postgraduation' ? 'Postgraduation' : 'Graduation', // Automatically set the type
    });

    // Close the form
    onClose();
  };

  return (
    <div className='p-5'>
      <h2 className="text-2xl font-semibold mb-5 text-center pt-5">Add {type} Details</h2>
      <form>
        {/* Form fields */}
        <div className="mb-4">
          <label htmlFor="college" className="block text-sm font-medium text-gray-700">
            College
          </label>
          <input
            type="text"
            id="college"
            value={educationData.college}
            onChange={(e) => setEducationData({ ...educationData, college: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className='flex gap-20'>
        <div className="mb-4">
          <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
            Start Year
          </label>
          <input
            type="text"
            id="startYear"
            value={educationData.startYear}
            onChange={(e) => setEducationData({ ...educationData, startYear: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
            End Year
          </label>
          <input
            type="text"
            id="endYear"
            value={educationData.endYear}
            onChange={(e) => setEducationData({ ...educationData, endYear: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        </div>
       <div className='flex gap-20'>
       <div className="mb-4">
          <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
            degree
          </label>
          <input
            type="text"
            id="degree"
            value={educationData.degree}
            onChange={(e) => setEducationData({ ...educationData, degree: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
          stream
          </label>
          <input
            type="text"
            id="stream"
            value={educationData.stream}
            onChange={(e) => setEducationData({ ...educationData, stream: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
       </div>
        <div className="mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
          percentage
          </label>
          <input
            type="text"
            id="percentage"
            value={educationData.percentage}
            onChange={(e) => setEducationData({ ...educationData, percentage: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Add {type}
          </button>
          <button
            type="button"
            className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGraduationForm;
