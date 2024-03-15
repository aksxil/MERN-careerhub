import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEducation, asyncloaduser } from '../../store/userActions';

const EditGrad = ({ onClose, educationData, type }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  // Initialize formData based on the type of education
  const [formData, setFormData] = useState(educationData);

  // Function to handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Check if the user is authenticated before dispatching the action
    if (!user.isAuthenticated) {
      console.error('User not authenticated');
      return;
    }
    // Dispatch the updateEducation action with the formData and educationData id
    dispatch(updateEducation({ ...formData, id: educationData.id }));
    // Close the form
    onClose();
  };

  return (
    <div className='p-5'>
      <h2 className="text-2xl font-semibold mb-5 text-center pt-5">Edit {type} Details</h2>
      <form>
        {/* Render input fields based on the type */}
        {type === 'Graduation' && (
          <>
            {/* College input */}
            <div className="mb-4">
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                College
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Other graduation input fields */}
            {/* Start Year */}
            <div className="mb-4">
              <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
                Start Year
              </label>
              <input
                type="text"
                id="startYear"
                name="startYear"
                value={formData.startYear}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* End Year */}
            <div className="mb-4">
              <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
                End Year
              </label>
              <input
                type="text"
                id="endYear"
                name="endYear"
                value={formData.endYear}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Degree */}
            <div className="mb-4">
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Stream */}
            <div className="mb-4">
              <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
                Stream
              </label>
              <input
                type="text"
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Percentage */}
            <div className="mb-4">
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="text"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
        {/* Render input fields for 'Senior Secondary' */}
        {type === 'Senior Secondary' && (
          <>
            {/* School */}
            <div className="mb-4">
              <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                School
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Year of Completion */}
            <div className="mb-4">
              <label htmlFor="yearofcompl" className="block text-sm font-medium text-gray-700">
                Year of Completion
              </label>
              <input
                type="text"
                id="yearofcompl"
                name="yearofcompl"
                value={formData.yearofcompl}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Board */}
            <div className="mb-4">
              <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                Board
              </label>
              <input
                type="text"
                id="board"
                name="board"
                value={formData.board}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Stream */}
            <div className="mb-4">
              <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
                Stream
              </label>
              <select
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Stream</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
              </select>
            </div>
            {/* Percentage */}
            <div className="mb-4">
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="text"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
         {type === 'Secondary' && (
          <>
            {/* School */}
            <div className="mb-4">
              <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                School
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Year of Completion */}
            <div className="mb-4">
              <label htmlFor="yearofcompl" className="block text-sm font-medium text-gray-700">
                Year of Completion
              </label>
              <input
                type="text"
                id="yearofcompl"
                name="yearofcompl"
                value={formData.yearofcompl}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Board */}
            <div className="mb-4">
              <label htmlFor="board" className="block text-sm font-medium text-gray-700">
                Board
              </label>
              <input
                type="text"
                id="board"
                name="board"
                value={formData.board}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Percentage */}
            <div className="mb-4">
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="text"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
        {type === 'Diploma' && (
          <>
            {/* College input */}
            <div className="mb-4">
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                College
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Other graduation input fields */}
            {/* Start Year */}
            <div className="mb-4">
              <label htmlFor="startYear" className="block text-sm font-medium text-gray-700">
                Start Year
              </label>
              <input
                type="text"
                id="startYear"
                name="startYear"
                value={formData.startYear}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* End Year */}
            <div className="mb-4">
              <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">
                End Year
              </label>
              <input
                type="text"
                id="endYear"
                name="endYear"
                value={formData.endYear}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Stream */}
            <div className="mb-4">
              <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
                Stream
              </label>
              <input
                type="text"
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            {/* Percentage */}
            <div className="mb-4">
              <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                Percentage
              </label>
              <input
                type="text"
                id="percentage"
                name="percentage"
                value={formData.percentage}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
        <div className="mt-6">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Save Changes
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

export default EditGrad;
