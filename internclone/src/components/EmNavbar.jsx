import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncsignout } from '../store/userActions';  // Update the path based on your project structure

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    // Dispatch the asyncsignout action when the "Sign Out" button is clicked
    dispatch(asyncsignout());
  };
  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };


  return (
    <div className='nav h-20 w-full bg-zinc-100 flex items-center justify-between px-5 border-b-2 z-10'>
      <Link to="/employe/dashboard">
        <img className='w-40' src="https://upload.wikimedia.org/wikipedia/en/8/8b/Internshala_company_logo.png" alt="" />
      </Link>
      <div className="prt2 flex gap-4 items-center">
        {user.isAuthenticated ? (
          <>
            <h4 className='font-semibold'>Internships🚀</h4>
            <h4 className='font-semibold'>Jobs💻</h4>
            {user.user && (  // Add a conditional check for user.user
              <>
                <div
                  className="h-10 w-10 overflow-hidden bg-zinc-300 rounded-full flex items-center justify-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img className='h-full w-full object-cover' src={user.user.organizationLogo.url} alt="" />
                </div>
                {isMenuOpen && (
                <div
                className="menus flex flex-col gap-1 opacity-1 h-[86vh] w-[30vw] px-4 bg-zinc-100 absolute right-[0%] top-[11%] shadow-lg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                 <div className='min-h-10 w-full border-b bottom-5 border-red pb-4 mb-5'>
                   <h1 className='mt-10 text-2xl'>{user.user.firstname} {user.user.lastname}</h1>
                   <h6>{user.user.email}</h6>
                 </div>
                 <Link to='/update-employe' className='text-sky-500 font-semibold pb-1'>Edit Profile</Link>
                 <Link to='/employe-changepassword' className='text-sky-500 font-semibold pb-1'>Change Password</Link>
               </div>
                )

                }
                
                <button
                  className='border-sky-600 border px-6 py-1 text-white bg-[#00A5EC] font-semibold rounded-md'
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <Link className='border-sky-600 border px-6 py-1 text-[#00A5EC] font-semibold rounded-md' to="/signin">
              Login
            </Link>
            <Link className='border-sky-600 border px-6 py-1 text-white bg-[#00A5EC] font-semibold rounded-md' to="/signup">
              Candidate Sign-up
            </Link>
            <Link className='border-sky-600 border px-6 py-1 text-white bg-[#00A5EC] font-semibold rounded-md' to='/employe/signup'>
              Hire Talent
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
