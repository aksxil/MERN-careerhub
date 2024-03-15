import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addJobPost, asyncloademploye } from '../../store/userActions';

const AddJobPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: '',
    skills: '',
    jobtype: 'In office',
    openings: 1,
    description: '',
    preferences: '',
    salary: 0,
    perks: '', 
    responsibility: '',
    stipendStatus: 'Fixed',
    stipendAmount: 0,
    assesments: '',
    location: ''
  });

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addJobPost(formData));
    onClose();
    toast.success('Succefully Job Post');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center mt-5">
      <div className="bg-zinc-100 p-8 rounded-lg shadow-lg w-[75%] relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input type="text" value={formData.title} onChange={(e) => handleInputChange(e, 'title')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Skills</label>
            <input type="text" value={formData.skills} onChange={(e) => handleInputChange(e, 'skills')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Job Type</label>
            <select value={formData.jobtype} onChange={(e) => handleInputChange(e, 'jobtype')} className="w-full p-2 border rounded-md">
              <option value="In office">In office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input type="number" value={formData.location} onChange={(e) => handleInputChange(e, 'location')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Openings</label>
            <input type="number" value={formData.openings} onChange={(e) => handleInputChange(e, 'openings')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => handleInputChange(e, 'description')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Preferences</label>
            <textarea value={formData.preferences} onChange={(e) => handleInputChange(e, 'preferences')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Salary</label>
            <input type="number" value={formData.salary} onChange={(e) => handleInputChange(e, 'salary')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Perks</label>
            <textarea value={formData.perks} onChange={(e) => handleInputChange(e, 'perks')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Responsibilities</label>
            <textarea value={formData.responsibility} onChange={(e) => handleInputChange(e, 'responsibility')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Stipend Status</label>
            <select value={formData.stipendStatus} onChange={(e) => handleInputChange(e, 'stipendStatus')} className="w-full p-2 border rounded-md">
              <option value="Fixed">Fixed</option>
              <option value="Negotiable">Negotiable</option>
              <option value="Performance Based">Performance Based</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Stipend Amount</label>
            <input type="number" value={formData.stipendAmount} onChange={(e) => handleInputChange(e, 'stipendAmount')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Assessments</label>
            <textarea value={formData.assesments} onChange={(e) => handleInputChange(e, 'assesments')} className="w-full p-2 border rounded-md" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobPost;
