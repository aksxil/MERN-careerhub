import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

import { asyncloaduser, asyncloademploye } from "./store/userActions";

// ---------- AUTH ----------
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Employesignin from "./components/auth/Employesignin";
import Employesignup from "./components/auth/Employesignup";
import Student from "./components/auth/Student";
import Employedash from "./components/auth/Employedash";

// ---------- STUDENT ----------
import Myresume from "./components/pages/Myresume";
import JobDetailsPage from "./components/studentdash/JobDetailsPage";
import InternDetailsPage from "./components/studentdash/InternDetailsPage";
import MyApplications from "./components/studentdash/MyApplications";
import SavedItemsPage from "./components/studentdash/Saved";
import ChangePasswordForm from "./components/studentdash/ChangePass";
import EmailSend from "./components/studentdash/EmailSend";
import ResetPasswordPage from "./components/studentdash/ResetPassword";

// ---------- EMPLOYEE ----------
import UpdateEmploye from "./components/UpdateEmploye";
import ViewJob from "./components/Employedash/ViewJob";
import ViewInternship from "./components/Employedash/ViewInternship";
import ViewJobApplicant from "./components/Employedash/ViewJobApplicant";
import ChangePasswordEm from "./components/Employedash/ChangeEmPass";
import EmEmailSend from "./components/Employedash/EmEmailSend";
import ResetPasswordPageEm from "./components/Employedash/ResetPassEm";

// ---------- COMMON ----------
import Home from "./components/Home";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    // Load auth info once app mounts
    dispatch(asyncloaduser());
    dispatch(asyncloademploye());
  }, [dispatch]);

  // 🔒 Wait until auth state is known
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-zinc-50 text-black">
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/send-mail" element={<EmailSend />} />
        <Route path="/student/forget-link/:id" element={<ResetPasswordPage />} />

        {/* ---------- EMPLOYEE AUTH ---------- */}
        <Route path="/employe/signup" element={<Employesignup />} />
        <Route path="/employe/signin" element={<Employesignin />} />
        <Route path="/employe/send-mail" element={<EmEmailSend />} />
        <Route path="/employe/forget-link/:id" element={<ResetPasswordPageEm />} />

        {/* ---------- STUDENT PROTECTED ---------- */}
        <Route
          path="/student/dashboard"
          element={isAuthenticated ? <Student /> : <Signin />}
        />
        <Route
          path="/resume"
          element={isAuthenticated ? <Myresume /> : <Signin />}
        />
        <Route
          path="/myapplications"
          element={isAuthenticated ? <MyApplications /> : <Signin />}
        />
        <Route
          path="/saved"
          element={isAuthenticated ? <SavedItemsPage /> : <Signin />}
        />
        <Route
          path="/change-password"
          element={isAuthenticated ? <ChangePasswordForm /> : <Signin />}
        />

        {/* ---------- EMPLOYEE PROTECTED ---------- */}
        <Route
          path="/employe/dashboard"
          element={isAuthenticated ? <Employedash /> : <Employesignin />}
        />
        <Route
          path="/update-employe"
          element={isAuthenticated ? <UpdateEmploye /> : <Employesignin />}
        />
        <Route
          path="/employe-changepassword"
          element={isAuthenticated ? <ChangePasswordEm /> : <Employesignin />}
        />

        {/* ---------- JOB / INTERNSHIP ---------- */}
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
        <Route path="/internships/:internshipId" element={<InternDetailsPage />} />
        <Route path="/view-job/:jobId" element={<ViewJob />} />
        <Route path="/view-internship/:internshipId" element={<ViewInternship />} />
        <Route path="/viewJobApplicant/:studentId" element={<ViewJobApplicant />} />
      </Routes>
    </div>
  );
};

export default App;
