import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useHistory } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloademploye, asyncloaduser } from "./store/userActions";
import { Route, Routes } from "react-router-dom";
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Employesignin from './components/auth/Employesignin';
import Employesignup from './components/auth/Employesignup';
import Student from './components/auth/Student';
import Myresume from './components/pages/Myresume';
import Employedash from './components/auth/Employedash';
import UpdateEmploye from './components/UpdateEmploye';
import ViewJob from './components/Employedash/ViewJob';
import ViewInternship from './components/Employedash/ViewInternship';
import JobDetailsPage from './components/studentdash/JobDetailsPage';
import InternDetailsPage from './components/studentdash/InternDetailsPage';
import MyApplications from './components/studentdash/MyApplications';
import ViewJobApplicant from './components/Employedash/ViewJobApplicant';
import SavedItemsPage from './components/studentdash/Saved';
import ChangePasswordForm from './components/studentdash/ChangePass';
import ChangePasswordEm from './components/Employedash/ChangeEmPass';
import EmailSend from './components/studentdash/EmailSend'
import ResetPasswordPage from './components/studentdash/ResetPassword';
import EmEmailSend from './components/Employedash/EmEmailSend'
import ResetPasswordPageEm from './components/Employedash/ResetPassEm';
import Home from './components/Home'


const App = () => {
  
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Dispatch actions to load user and employee details when the component mounts
    dispatch(asyncloaduser());
    dispatch(asyncloademploye());
  }, [dispatch]);
  
  return (
    <div className='w-full min-h-screen bg-zinc-50 text-black'>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path='/employe/signin' element={<Employesignin/>}></Route>
        <Route path='/student/dashboard' element={user.isAuthenticated ? <Student/> :<Signin/>}></Route>
        <Route path='/employe/dashboard' element={user.isAuthenticated ? <Employedash/> : <Employesignin/>}></Route>
        <Route path='/resume' element={user.isAuthenticated ? <Myresume/> : <Signin/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/employe/signup' element={<Employesignup/>}></Route>
        <Route path='/update-employe' element={user.isAuthenticated ? <UpdateEmploye/> : <Employesignin/>}></Route>
        <Route path='/view-job/:jobId' element={<ViewJob/>}></Route>
        <Route path='view-internship/:internshipId' element={<ViewInternship/>}></Route>
        <Route path='/jobs/:jobId' element={<JobDetailsPage/>}></Route>
        <Route path='/internships/:internshipId' element={<InternDetailsPage/>}></Route>
        <Route path='/myapplications' element={user.isAuthenticated ? <MyApplications/> : <Signin/>}></Route>
        <Route path='viewJobApplicant/:studentId' element={<ViewJobApplicant/>}></Route>
        <Route path='/saved' element={user.isAuthenticated ? <SavedItemsPage/> : <Signin/>}></Route>
        <Route path='/change-password' element={user.isAuthenticated ? <ChangePasswordForm/> : <Signin/>}></Route>
        <Route path='/employe-changepassword' element={user.isAuthenticated ? <ChangePasswordEm/> : <Employesignin/>}></Route>
        <Route path='/send-mail' element={<EmailSend/>}></Route>
        <Route path="/student/forget-link/:id" element={<ResetPasswordPage/>} />
        <Route path='/employe/send-mail' element={<EmEmailSend/>}></Route>
        <Route path='/employe/forget-link/:id' element={<ResetPasswordPageEm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
