import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { applyForInternship, asyncloaduser, fetchInternDetailsStu, saveJobInternship } from '../../store/userActions'; // Import the action for saving job or internship
import Navbar from '../Navbar';

const InternDetailsPage = () => {
  const { internshipId } = useParams();
  const dispatch = useDispatch();
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // State variable to track if the internship is saved by the student

  useEffect(() => {
    dispatch(asyncloaduser());
  }, [dispatch]);

  const internship = useSelector(state => state.user.internshipDetails[internshipId]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (internshipId && !internship) {
      dispatch(fetchInternDetailsStu(internshipId));
    }
  }, [dispatch, internshipId, internship]);

  useEffect(() => {
    if (internship && internship.data && user.isAuthenticated && user.user) {
      const appliedStudents = internship.data.students;
      const isAlreadyApplied = appliedStudents.includes(user.user._id);
      setIsAlreadyApplied(isAlreadyApplied);
    }
  }, [internship, user]);

  useEffect(() => {
    // Check if the internship ID is included in the savedInternships array of the user
    if (user.isAuthenticated && user.user && user.user.savedInternships.includes(internshipId)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [user, internshipId]);

  const handleApply = () => {
    dispatch(applyForInternship(internshipId)).then(() => {
      setIsAlreadyApplied(true);
      toast.success('Applied Successfully');
    });
  };

  const handleSave = () => {
    // Dispatch action to save the internship
    dispatch(saveJobInternship(user.user._id, internshipId, 'internship')).then(() => {
      setIsSaved(true); // Update state to reflect that the internship is saved
      toast.success('Save Job Successfully');
    }).catch(() => {
      setIsSaved(false); // Handle error in case save fails
    });
  };

  if (!internship || !internship.data) {
    return <div>Loading...</div>;
  }

  const { profile, internshiptype, stipend, duration, skill, preferences, responsibility, assesments } = internship.data;

  return (
    <div className="min-h-screen w-full pb-[20vh]">
      <Navbar />
      <h2 className="text-3xl p-8 font-semibold text-center">{profile} ({internshiptype})</h2>
      <div className="min-h-screen w-[85%] m-auto border-2 px-5 py-10">
        <h2 className="font-semibold">{profile}</h2>
        <p className="mt-2">Type: {internshiptype}</p>
        <p className="mt-1"><span className="font-semibold">Stipend:</span> {stipend.amount}/month</p>
        <p className="mt-1"><span className="font-semibold">Duration:</span> {duration}</p>
        <p className="mt-1"><span className="font-semibold">Skills:</span> <span className="text-sky-500">{skill}</span></p>
        <p className="mt-1"><span className="font-semibold">Preferences:</span> {preferences}</p>
        <p className="mt-5"><span className="font-semibold">Responsibility:</span> {responsibility}</p>
        <p className="mt-5"><span className="font-semibold">Assessments:</span> {assesments}</p>
        {!isAlreadyApplied && user.isAuthenticated && (
          <button onClick={handleApply} className="px-10 py-2 bg-sky-500 text-xl text-white rounded-md ml-[42%] mt-10">Apply Now</button>
        )}
        {isAlreadyApplied && user.isAuthenticated && (
          <p className="mt-5 text-red-500 font-semibold">Already Applied</p>
        )}
        {!isSaved && user.isAuthenticated && (
          <button onClick={handleSave} className="px-10 py-2 bg-blue-500 text-xl text-white rounded-md ml-[42%] mt-5">Save Internship</button>
        )}
        {isSaved && user.isAuthenticated && (
          <p className="mt-5 text-green-500 font-semibold">Internship Saved</p>
        )}
      </div>
    </div>
  );
};

export default InternDetailsPage;
