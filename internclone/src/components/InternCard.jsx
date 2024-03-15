import React from 'react';
import { Link } from 'react-router-dom';

const InternCard = ({ internship }) => {
  const {
   profile,
   stipend,
   internshiptype,
   employe,
   _id,
   location
    // Other job details
  } = internship;

  const handleViewDetails = () => {
    // Logic to view job details
  };

  return (
    <div className="job-card h-[52vh] w-[48vh] bg-white rounded-lg p-3">
      <h1 className='border flex items-center gap-2 font-semibold text-slate-400'><span className='text-xl text-sky-500 '><i className="ri-funds-line"></i></span> Actively hiring</h1>
      <div className="job-details mt-2 flex items-center border-b pb-4">
      <div>
      <h1 className='text-[16px] font-semibold'>{profile}</h1>
      <h2 className='text-[14px]'>{employe.organizationname}</h2>
      </div>
      <img className='h-20' src={employe.organizationLogo.url} alt="" />
      </div>
      <h3 className='mt-1 text-sm'><i className="ri-map-pin-2-line"></i> Work From {internshiptype}</h3>
      <h3 className='mt-1 text-sm'><i className="ri-map-pin-2-line"></i> Loaction: {location}</h3>
      <h5 className='mt-1 text-sm'><i className="ri-money-rupee-circle-line"></i> {stipend.amount}/month</h5>
      <div className='flex w-full justify-between items-center mt-[40px]'>
        <h5 className='bg-slate-200 px-2 text-sm'>Internship</h5>
        <button className='text-sky-500 font-semibold' onClick={handleViewDetails}><Link to={`/internships/${_id}`} className='view-details-link'>View Details <i className="ri-arrow-right-s-line"></i></Link></button>
      </div>
    </div>
  );
};

export default InternCard;
