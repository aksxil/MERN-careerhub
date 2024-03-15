import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotPasswordLink } from '../../store/userActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading); // Assuming isLoading is from user slice
  const error = useSelector(state => state.user.error); // Assuming error is from user slice

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(sendForgotPasswordLink(email));
      toast.success('Forgot password link sent successfully');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {error && <p className="text-red-500 mb-4">{}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 font-semibold">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
        >
          {isLoading ? 'Sending...' : 'Send Forgot Password Link'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ForgotPasswordForm;
