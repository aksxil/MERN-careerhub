import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignout } from "../store/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleSignOut = () => {
    dispatch(asyncsignout());
    setIsMenuOpen(false);
  };

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 w-full bg-zinc-100 border-b flex items-center px-6 justify-between sticky top-0 z-50">
      
      {/* LOGO */}
      <Link to="/employe/dashboard" className="text-2xl font-bold text-indigo-600">
        Career<span className="text-gray-900">Hub</span>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {isAuthenticated && user ? (
          <>
            <span className="font-medium">Internships 🚀</span>
            <span className="font-medium">Jobs 💻</span>

            {/* PROFILE + MENU */}
            <div className="relative flex items-center gap-2" ref={menuRef}>
              
              {/* AVATAR (NOT CLICKABLE) */}
              <div className="h-10 w-10 rounded-full overflow-hidden border bg-zinc-200">
                <img
                  src={user.organizationLogo?.url}
                  alt="logo"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 rounded-md hover:bg-zinc-200 transition"
              >
                <i className="ri-menu-3-line text-xl"></i>
              </button>

              {/* DROPDOWN */}
              {isMenuOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white shadow-xl rounded-xl p-4 border animate-fadeIn">
                  
                  <div className="border-b pb-3 mb-3">
                    <h3 className="font-semibold">
                      {user.firstname} {user.lastname}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    to="/update-employe"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sky-600 font-medium"
                  >
                    Edit Profile
                  </Link>

                  <Link
                    to="/employe-changepassword"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sky-600 font-medium"
                  >
                    Change Password
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="mt-3 w-full bg-sky-500 text-white py-2 rounded-lg font-semibold hover:bg-sky-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="border border-sky-500 px-4 py-1 rounded-md text-sky-500 font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-sky-500 text-white px-4 py-1 rounded-md font-semibold"
            >
              Candidate Sign-up
            </Link>
            <Link
              to="/employe/signup"
              className="bg-sky-500 text-white px-4 py-1 rounded-md font-semibold"
            >
              Hire Talent
            </Link>
          </>
        )}
      </div>

      {/* SIMPLE ANIMATION */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.15s ease-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;
