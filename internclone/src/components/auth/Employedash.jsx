import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloademploye } from "../../store/userActions";
import EmNavbar from "../EmNavbar";
import AddJobPost from "../Employedash/AddJobPost";
import AddInternshipPost from "../Employedash/AddInternshipPost";
import RandomPost from "../Employedash/RandomPost";
import RandomIntern from "../Employedash/RandomIntern";

const Employedash = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const [showJobPost, setShowJobPost] = useState(false);
  const [showInternshipPost, setShowInternshipPost] = useState(false);

  useEffect(() => {
    dispatch(asyncloademploye());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Please login to continue</h2>
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const openJobPost = () => {
    setShowJobPost(true);
    setShowInternshipPost(false);
  };

  const openInternshipPost = () => {
    setShowInternshipPost(true);
    setShowJobPost(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EmNavbar />

      {/* HERO */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h2 className="text-xl text-gray-500">
            Employer Dashboard
          </h2>
          <h1 className="text-4xl font-bold mt-2">
            Hi, {user.firstname}! 👋
          </h1>

          {/* ACTION BUTTONS */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <button
              onClick={openJobPost}
              className={`px-6 py-3 rounded-lg font-semibold transition
                ${
                  showJobPost
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }
              `}
            >
              + Post Job
            </button>

            <button
              onClick={openInternshipPost}
              className={`px-6 py-3 rounded-lg font-semibold transition
                ${
                  showInternshipPost
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }
              `}
            >
              + Post Internship
            </button>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {showJobPost && (
        <AddJobPost onClose={() => setShowJobPost(false)} />
      )}

      {showInternshipPost && (
        <AddInternshipPost
          onClose={() => setShowInternshipPost(false)}
        />
      )}

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {/* JOB POSTS */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Your Job Listings
          </h2>
          <RandomPost />
        </div>

        {/* INTERNSHIP POSTS */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Your Internship Listings
          </h2>
          <RandomIntern />
        </div>
      </section>
    </div>
  );
};

export default Employedash;
