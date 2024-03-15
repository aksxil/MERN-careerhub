import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, updatePortfolio } from '../../store/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditPortfolio = ({ portfolioData, onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        // Fetch user details when the component mounts
        dispatch(asyncloaduser());
    }, [dispatch]);

  const [formData, setFormData] = useState({
    blogLink: portfolioData.blogLink || '',
    githubProfile: portfolioData.githubProfile || '',
    playStoreDevAccount: portfolioData.playStoreDevAccount || '',
    behancePortfolio: portfolioData.behancePortfolio || '',
    otherWorkSample: portfolioData.otherWorkSample || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePortfolio(formData));
    onClose(); // Close the modal or form after editing
  };

  return (
    <div className="w-[70%] fixed top-0 left-[25vh] m-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Portfolio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="blogLink" className="block text-sm font-medium text-gray-700">Blog Link</label>
          <input
            type="text"
            id="blogLink"
            name="blogLink"
            value={formData.blogLink}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter Blog Link"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="githubProfile" className="block text-sm font-medium text-gray-700">GitHub Profile</label>
          <input
            type="text"
            id="githubProfile"
            name="githubProfile"
            value={formData.githubProfile}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter GitHub Profile Link"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="playStoreDevAccount" className="block text-sm font-medium text-gray-700">Play Store Developer Account</label>
          <input
            type="text"
            id="playStoreDevAccount"
            name="playStoreDevAccount"
            value={formData.playStoreDevAccount}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter Play Store Developer Account Link"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="behancePortfolio" className="block text-sm font-medium text-gray-700">Behance Portfolio</label>
          <input
            type="text"
            id="behancePortfolio"
            name="behancePortfolio"
            value={formData.behancePortfolio}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter Behance Portfolio Link"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="otherWorkSample" className="block text-sm font-medium text-gray-700">Other Work Sample</label>
          <input
            type="text"
            id="otherWorkSample"
            name="otherWorkSample"
            value={formData.otherWorkSample}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter Other Work Sample Link"
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
    </div>
  );
};

export default EditPortfolio;
