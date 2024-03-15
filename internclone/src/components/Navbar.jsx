import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncsignout } from '../store/userActions'; // Update the path based on your project structure

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    // Dispatch the asyncsignout action when the "Sign Out" button is clicked
    dispatch(asyncsignout());
    toast.error("Please Login to access")
  };

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="nav h-20 w-full bg-zinc-100 flex items-center justify-between px-5 border-b-2 z-10">
      <Link to="/student/dashboard">
        <img className="w-40" src="https://upload.wikimedia.org/wikipedia/en/8/8b/Internshala_company_logo.png" alt="" />
      </Link>
      <div className="prt2 flex gap-4 items-center relative">
        {user.isAuthenticated ? (
          <>
            <Link className="font-semibold">Internships🚀</Link>
            <h4 className="font-semibold">Jobs💻</h4>
            <Link to="/saved" className='font-semibold'>Saved <i className="ri-bookmark-fill"></i></Link>
            {user.user && (
              <>
                <div
                  className="h-10 w-10 overflow-hidden bg-zinc-300 rounded-full flex items-center justify-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img className="menu-btn h-full w-full object-cover" src={user.user.avatar.url} alt="" />
                </div>
                {isMenuOpen && (
                  <div
                    className="menus flex flex-col gap-1 opacity-1 h-[86vh] w-[30vw] px-4 bg-zinc-100 absolute right-[-4%] top-9 shadow-lg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="min-h-10 w-full border-b border-black bottom-5 border-red pb-4 mb-5">
                      <h1 className="mt-10 text-2xl">{user.user.firstname} {user.user.lastname}</h1>
                      <h6>{user.user.email}</h6>
                    </div>
                    <Link to="/resume" className='text-sky-500 font-semibold pb-1'>Edit Profile & Resume <i className="ri-edit-2-line"></i></Link>
                    <Link to="/myapplications" className='text-sky-500 font-semibold pb-1'>My Applications <i className="ri-profile-line"></i></Link>
                    <Link to="/saved" className='text-sky-500 font-semibold pb-1'>Saved Jobs & Internships <i className="ri-bookmark-line"></i></Link>
                    <Link to='/change-password' className='text-sky-500 font-semibold pb-1'>Change Password <i className="ri-exchange-line"></i></Link>
                  </div>
                )}
                <button
                  className="border-sky-600 border px-6 py-1 text-white bg-[#00A5EC] font-semibold rounded-md"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <Link className="border-sky-600 border px-6 py-1 text-[#00A5EC] font-semibold rounded-md" to="/signin">
              Login
            </Link>
            <Link className="border-sky-600 border px-6 py-1 text-white bg-[#00A5EC] font-semibold rounded-md" to="/signup">
              Candidate Sign-up
            </Link>
            <Link className="border-sky-600 border px-6 py-1 text-white bg-[#00A5EC] font-semibold rounded-md" to="/employe/signup">
              Hire Talent
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
