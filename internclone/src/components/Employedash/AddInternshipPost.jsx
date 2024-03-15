import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addInternshipPost, asyncloademploye } from '../../store/userActions';

const AddInternshipPost = ({ onClose }) => {
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    profile: '',
    skill: '',
    internshiptype: 'In office',
    openings: 1,
    from: '',
    to: '',
    duration: '',
    responsibility: '',
    preferences: '',
    stipendStatus: 'Fixed',
    stipendAmount: 0,
    perks: '',
    assesments: '',
    location:''
  });

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { stipendStatus, stipendAmount, ...rest } = formData;
    const postData = {
      ...rest,
      stipend: {
        status: stipendStatus,
        amount: stipendAmount
      }
    };
    await dispatch(addInternshipPost(postData));
    onClose();
    toast.success('Succefully Internship Post');
  };

  return (
    <div className="flex w-full absolute min-h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full">
        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New Internship</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Profile</label>
            <input type="text" value={formData.profile} onChange={(e) => handleInputChange(e, 'profile')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Skill</label>
            <input type="text" value={formData.skill} onChange={(e) => handleInputChange(e, 'skill')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Internship Type</label>
            <select value={formData.internshiptype} onChange={(e) => handleInputChange(e, 'internshiptype')} className="w-full p-2 border rounded-md">
              <option value="In office">In office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">location</label>
            <textarea value={formData.location} onChange={(e) => handleInputChange(e, 'location')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Preferences</label>
            <textarea value={formData.preferences} onChange={(e) => handleInputChange(e, 'preferences')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Openings</label>
            <input type="number" value={formData.openings} onChange={(e) => handleInputChange(e, 'openings')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">From</label>
            <input type="text" value={formData.from} onChange={(e) => handleInputChange(e, 'from')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">To</label>
            <input type="text" value={formData.to} onChange={(e) => handleInputChange(e, 'to')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Duration</label>
            <input type="text" value={formData.duration} onChange={(e) => handleInputChange(e, 'duration')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Responsibility</label>
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
            <label className="block mb-1">Perks</label>
            <textarea value={formData.perks} onChange={(e) => handleInputChange(e, 'perks')} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block mb-1">Assessments</label>
            <textarea value={formData.assesments} onChange={(e) => handleInputChange(e, 'assesments')} className="w-full p-2 border rounded-md" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Add Internship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInternshipPost;
