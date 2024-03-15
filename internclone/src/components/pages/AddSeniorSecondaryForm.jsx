import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, asyncloaduser } from '../../store/userActions'; // Import addEducation action

const AddSeniorSecondaryForm = ({ onClose, type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [educationData, setEducationData] = useState({
    status: '', // Automatically set the type
    school: '',
    yearofcompl: '',
    board: '',
    stream: '',
    percentage: '',
    type: type === 'PostSeniorSecondary' ? 'Post Senior Secondary' : 'Senior Secondary',
  });

  const handleSubmit = async () => {
    // Check if the user is authenticated before dispatching the action
    if (!user.isAuthenticated) {
      console.error('User not authenticated');
      return;
    }
    // Dispatch the addEducation action with the educationData
    dispatch(addEducation(educationData)); // Use addEducation action
    // Reset the form fields or perform any other actions as needed
    setEducationData({
      status: '', // Automatically set the type
      school: '',
      yearofcompl: '',
      board: '',
      stream: '',
      type: type === 'PostSeniorSecondary' ? 'Post Senior Secondary' : 'Senior Secondary',
      percentage: '',
    });
    // Close the form
    onClose();
  };

  return (
    <div className='p-5'>
      <h2 className="text-2xl font-semibold mb-5 text-center pt-5">Add {type === 'PostSeniorSecondary' ? 'Post Senior Secondary' : 'Senior Secondary'} Education Details</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
            School
          </label>
          <input
            type="text"
            id="school"
            value={educationData.school}
            onChange={(e) => setEducationData({ ...educationData, school: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className='flex gap-20'>
          <div className="mb-4">
            <label htmlFor="yearofcompl" className="block text-sm font-medium text-gray-700">
              Year of Completion
            </label>
            <input
              type="text"
              id="yearofcompl"
              value={educationData.yearofcompl}
              onChange={(e) => setEducationData({ ...educationData, yearofcompl: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="board" className="block text-sm font-medium text-gray-700">
              Board
            </label>
            <input
              type="text"
              id="board"
              value={educationData.board}
              onChange={(e) => setEducationData({ ...educationData, board: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
            Stream
          </label>
          <select
            id="stream"
            value={educationData.stream}
            onChange={(e) => setEducationData({ ...educationData, stream: e.target.value })}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select Stream</option>
            <option value="Arts">Arts</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
            Percentage
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
            Add {type === 'PostSeniorSecondary' ? 'Post Senior Secondary' : 'Senior Secondary'} Education
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

export default AddSeniorSecondaryForm;
