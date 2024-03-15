import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloademploye } from '../../store/userActions';
import EmNavbar from '../EmNavbar';
import AddJobPost from '../Employedash/AddJobPost';
import RandomPost from '../Employedash/RandomPost';
import AddInternshipPost from '../Employedash/AddInternshipPost';
import RandomIntern from '../Employedash/RandomIntern';

const Employedash = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showJobPost, setShowJobPost] = useState(false);
  const [showInternshipPost, setShowInternshipPost] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  if (!user || !user.isAuthenticated) {
    return <h2>Please log in to see your details.</h2>;
  }

  if (!user.user) {
    return <p>Loading user details...</p>;
  }

  const handleJobPostButtonClick = () => {
    setShowJobPost(true);
    setShowInternshipPost(false);
  };

  const handleInternshipPostButtonClick = () => {
    setShowJobPost(false);
    setShowInternshipPost(true);
  };

  return (
    <div>
      <EmNavbar />
      <div className='w-full min-h-[86vh]'>
        <div className="div w-full h-40 py-8 text-center">
          <h2 className='text-[4vh] font-semibold'>Employee Dashboard</h2>
          <h2 className='text-[7vh] font-semibold'>Hi, {user.user.firstname}!👋</h2>
          
          <div className='flex items-center w-full h-[20vh]  justify-center gap-20'>
            <button onClick={handleJobPostButtonClick} className='bg-sky-500 px-4 text-white py-3 rounded-md'>Post Job</button>
            <button onClick={handleInternshipPostButtonClick} className='bg-sky-500 px-4 text-white py-3 rounded-md'>Post Internship</button>
          </div>
          {showJobPost && <AddJobPost onClose={() => setShowJobPost(false)} />}
          {showInternshipPost && <AddInternshipPost onClose={() => setShowInternshipPost(false)} />}
        </div>
        <RandomPost/>  
        <RandomIntern/>
      </div>
    </div>
  );
};

export default Employedash;
