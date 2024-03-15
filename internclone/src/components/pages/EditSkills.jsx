import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, updateSkill } from '../../store/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditSkills = ({ skillData, onClose }) => {
    const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    skillName: skillData.skillName,
    proficiency: skillData.proficiency,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await dispatch(updateSkill(skillData.id, formData));
        onClose();
        toast.success('Skill updated successfully');
    } catch (error) {
        toast.error('Error updating Skill');
    }
};

  return (
    <div className="w-[50%] fixed top-[30vh] left-[30vh] m-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Skill</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Skill Name</label>
          <input
            type="text"
            name="skillName"
            value={formData.skillName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter skill name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Proficiency</label>
          <select
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="">Select proficiency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
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

export default EditSkills;
