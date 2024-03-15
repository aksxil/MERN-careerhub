// Import necessary dependencies and actions
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncloademploye, fetchInternshipDetails } from '../../store/userActions';

const RandomIntern = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  useEffect(() => {
    // Fetch internship details for each internship reference
    if (user.user.internships) {
      user.user.internships.forEach(internshipId => {
        dispatch(fetchInternshipDetails(internshipId)); // Dispatch action to fetch internship details
      });
    }
  }, [dispatch, user.user.internships]);

  return (
    <div className='mt text-center mt-10'>
      <h2 className='text-3xl'>Internships</h2>
      <div className='min-h-[30vh] w-full flex flex-wrap  mt-10 justify-center'>
        {user.user.internships && user.user.internships.map((internshipId, index) => {
          const internshipDetails = user.internshipDetails[internshipId];
          return (
            <div key={index}>
              {internshipDetails && (
                <div className='min-h-[20vh] w-[70vw] bg-[#F4F4F5] border-b border-black mb-5 rounded-lg shadow-md flex flex-col items-start p-5'>
                  <h3 className='text-xl font-semibold'>{internshipDetails.profile}</h3>
                  <p>Skills: {internshipDetails.skill}</p>
                  <Link to={`/view-internship/${internshipId}`} className='mt-4 px-4 py-2 rounded-md bg-sky-500 text-white'>View/Edit Internship</Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RandomIntern;
