import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { asyncloaduser, updateAccom } from '../../store/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAcom = ({ accomData, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [accom, setAccom] = useState(accomData.accom);

  const handleChange = (e) => {
    setAccom(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateAccom(accomData.id, { accom }));
      onClose();
      toast.success('Accomplishment updated successfully');
    } catch (error) {
      toast.error('Error updating Accomplishment');
    }
  };

  return (
    <div className="w-[50%] fixed top-[30vh] left-[30vh] m-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Accomplishment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Accomplishment</label>
          <input
            type="text"
            value={accom}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter Accomplishment"
          />
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
      <ToastContainer />
    </div>
  );
};

export default EditAcom;
