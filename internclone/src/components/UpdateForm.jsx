import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, updateUserDetails, uploadAvatar } from '../store/userActions';

const UpdateForm = ({ onClose }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  // State for form fields
  const [formData, setFormData] = useState({
    firstname: user.user.firstname,
    lastname: user.user.lastname,
    email: user.user.email,
    contact: user.user.contact,
    city: user.user.city,
    gender: user.user.gender,
  });

  // State for avatar file and preview
  const [avatarFormData, setAvatarFormData] = useState({
    avatar: null,
    preview: user.user.avatar.url, // Default to the current avatar URL
  });

  // Handle form field changes
  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];

    setAvatarFormData({
      avatar: selectedFile,
      preview: URL.createObjectURL(selectedFile), // Create a preview URL
    });
  };

  // Handle form submission for details update
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(user.user._id, formData));
    onClose(); // Close the form
    toast.success('Student Updated');
    // toast.error("Error to Update")
  };

  // Handle form submission for avatar upload
  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatarFormData.avatar);
    dispatch(uploadAvatar(user.user._id, formData));
    onClose(); // Close the form
  };

  return (
    <form className="max-w-lg mx-auto mt-5 p-6 bg-white rounded-md shadow-md relative">
      <button
          type="button"
          className="ml-2 absolute right-5 top-5 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-gray-300"
          onClick={onClose}
        >
          Close Form
        </button>
      <h2 className="text-2xl font-semibold mb-5">Update Profile</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={(e) => handleInputChange(e, 'firstname')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={(e) => handleInputChange(e, 'lastname')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, 'email')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={(e) => handleInputChange(e, 'contact')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={(e) => handleInputChange(e, 'city')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={(e) => handleInputChange(e, 'gender')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mt-4  flex items-center">
        <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
          Avatar
        </label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md"
        />
        {avatarFormData.preview && (
            <img
              src={avatarFormData.preview}
              alt="Avatar Preview"
              className="mt-2 rounded-md h-[19vh]"
            />
          )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSubmit}
        >
          Update Profile
        </button>
        <button
          type="submit"
          className="ml-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={handleAvatarSubmit}
        >
          Upload Avatar
        </button>
        {/* <button
          type="button"
          className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-gray-300"
          onClick={onClose}
        >
          Close Form
        </button> */}
      </div>
    </form>
  );
};

export default UpdateForm;
