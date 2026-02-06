import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncsignout } from "../store/userActions";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(asyncsignout());
    toast.success("Logged out successfully");
    setMenuOpen(false);
  };

  // 🔁 Logo redirect logic
  const logoRedirect = !isAuthenticated
    ? "/"
    : user?.role === "employe"
    ? "/employe/dashboard"
    : "/student/dashboard";

  return (
    <header className="w-full h-20 bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* LOGO */}
        <Link to={logoRedirect} className="text-2xl font-bold text-indigo-600">
          Career<span className="text-gray-900">Hub</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* AUTH LINKS */}
          {!isAuthenticated && (
            <>
              <Link
                to="/signin"
                className="font-medium text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Candidate Sign-up
              </Link>
              <Link
                to="/employe/signup"
                className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 transition"
              >
                Hire Talent
              </Link>
            </>
          )}

          {/* AUTHENTICATED */}
          {isAuthenticated && user && (
            <>
              {/* AVATAR */}
              <div className="h-10 w-10 rounded-full overflow-hidden border">
                <img
                  src={
                    user.avatar?.url ||
                    user.organizationLogo?.url ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* MENU BUTTON */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-2xl px-2"
              >
                ☰
              </button>
            </>
          )}
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {menuOpen && isAuthenticated && (
        <div className="absolute right-6 top-20 w-72 bg-white shadow-xl rounded-xl p-4 z-50">
          <div className="border-b pb-3 mb-3">
            <h3 className="font-semibold">
              {user.firstname} {user.lastname}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* STUDENT MENU */}
          {user.role !== "employe" && (
            <>
              <Link
                to="/resume"
                className="block py-2 text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Edit Profile & Resume
              </Link>
              <Link
                to="/myapplications"
                className="block py-2 text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                My Applications
              </Link>
              <Link
                to="/saved"
                className="block py-2 text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Saved Jobs
              </Link>
            </>
          )}

          {/* EMPLOYER MENU */}
          {user.role === "employe" && (
            <>
              <Link
                to="/employe/dashboard"
                className="block py-2 text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/update-employe"
                className="block py-2 text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Edit Company Profile
              </Link>
            </>
          )}

          <Link
            to="/change-password"
            className="block py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Change Password
          </Link>

          <button
            onClick={handleLogout}
            className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
