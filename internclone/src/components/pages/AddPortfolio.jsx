import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, addPortfolio } from '../../store/userActions';

const AddPortfolio = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    blogLink: '',
    githubProfile: '',
    playStoreDevAccount: '',
    behancePortfolio: '',
    otherWorkSample: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPortfolio(formData));
  };

  return (
    <div className="w-[70%] m-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Portfolio</h2>
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
          <label htmlFor="playStoreLink" className="block text-sm font-medium text-gray-700">Play Store Developer Account</label>
          <input
            type="text"
            id="playStoreLink"
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
          <label htmlFor="otherLink" className="block text-sm font-medium text-gray-700">Other Work Sample Link</label>
          <input
            type="text"
            id="otherLink"
            name="otherWorkSample"
            value={formData.otherWorkSample}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter Other Work Sample Link"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2">
            Add Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPortfolio;
