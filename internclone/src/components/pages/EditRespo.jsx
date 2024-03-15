import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser, updateRespo } from '../../store/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRespo = ({ onClose, respoData }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        // Fetch user details when the component mounts
        dispatch(asyncloaduser());
    }, [dispatch]);
    const [formData, setFormData] = useState({
        description: respoData.description,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateRespo(respoData.id, formData));
            onClose();
            toast.success('Job updated successfully');
        } catch (error) {
            toast.error('Error updating job');
        }
    };

    return (
        <div className='w-[70%] fixed top-40 left-[30vh] m-auto p-6 bg-white rounded-md shadow-md'>
            <h2 className='text-lg font-semibold mb-4'>Edit Responsibility</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Description</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows='4'
                        className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                        placeholder='Enter description'
                    ></textarea>
                </div>
                <div className='flex justify-end'>
                    <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2'>
                        Save
                    </button>
                    <button type='button' onClick={onClose} className='bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500'>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditRespo;
