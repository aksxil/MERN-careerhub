import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloademploye, updateEmployeDetails, updateUserDetails, uploadAvatar, uploadOrganizationLogo } from '../store/userActions';
import EmNavabr from './EmNavbar'

const UpdateEmploye = ({ onClose }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    firstname: user.user ? user.user.firstname || '' : '',
    lastname: user.user ? user.user.lastname || '' : '',
    email: user.user ? user.user.email || '' : '',
    contact: user.user ? user.user.contact || '' : '',
    organizationname: user.user ? user.user.organizationname || '' : ''
  }); 

  const [avatarFormData, setAvatarFormData] = useState({
    avatar: null,
    preview: '',
  });

  useEffect(() => {
    if (user.user) {
      setFormData({
        firstname: user.user.firstname || '',
        lastname: user.user.lastname || '',
        email: user.user.email || '',
        contact: user.user.contact || '',
        organizationname: user.user.organizationname || '',
      });
      setAvatarFormData({
        avatar: null,
        preview: user.user.organizationLogo ? user.user.organizationLogo.url || '' : '', // Check if organizationLogo exists
      });
    }
  }, [user.user]);

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const selectedFile = e.target.files[0];
    setAvatarFormData({
      ...avatarFormData,
      avatar: selectedFile,
      preview: URL.createObjectURL(selectedFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await dispatch(updateEmployeDetails(user.user._id, formData));
    setSubmitting(false);
    onClose();
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append('organizationLogo', avatarFormData.avatar); // Use avatar instead of organizationLogo
    await dispatch(uploadOrganizationLogo(user.user._id, formData));
    setSubmitting(false);
    onClose();
  };

  return (
    <div className='w-full min-h-screen '>
      <EmNavabr/>
      <form className="max-w-lg mx-auto mt-5 p-6 bg-white rounded-md shadow-md relative">
        <h2 className="text-2xl font-semibold mb-5">Update Profile</h2>
        
        {/* Conditionally render the form content if user data is available */}
        {user.user && (
          <div>
            <div className="grid grid-cols-2 gap-4 mt-4">
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
                <label htmlFor="organizationname" className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationname"
                  name="organizationname"
                  value={formData.organizationname}
                  onChange={(e) => handleInputChange(e, 'organizationname')}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>

            </div>

            <div className="mt-4 flex items-center">
              <label htmlFor="organizationLogo" className="block text-sm font-medium text-gray-700">
                Organization Logo
              </label>
              <input
                type="file"
                id="organizationLogo"
                name="organizationLogo"
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
                disabled={isSubmitting}
              >
                Update Profile
              </button>
              <button
                type="submit"
                className="ml-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                onClick={handleAvatarSubmit}
                disabled={isSubmitting}
              >
                Upload Avatar
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateEmploye;
