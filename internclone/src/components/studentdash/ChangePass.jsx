import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, studentResetPassword } from '../../store/userActions';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(asyncloaduser())
  },[dispatch])
  const studentId = useSelector(state=>state.user.user._id)
//   console.log(studentId)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await dispatch(studentResetPassword(studentId, formData.password));
      toast.success('Password changed successfully');
      // Redirect to dashboard after successful password change
      // history.push('/student/dashboard');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
   <div className='min-h-screen w-full'>
    <Navbar/>
     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">New Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Change Password
      </button>
    </form>
   </div>
  );
};

export default ChangePasswordForm;
