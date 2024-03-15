import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../Navbar'
import { asyncempsignup } from "../../store/userActions";

const Employesignup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState(user.error);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      await asyncempsignup({
        firstname: e.target[0].value,
        lastname: e.target[1].value,
        organizationname: e.target[2].value, // New field for organization name
        contact: e.target[3].value,
        email: e.target[4].value,
        password: e.target[5].value,
      })
    );
    toast.success('Employe Successfully Signup');
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/employe/dashboard");
    }
  }, [user.isAuthenticated, navigate]);

  return (
    <div className='w-full h-screen bg-slate-50'>
      <Navbar />
      <div className='w-full h-[90vh]  flex bg-[url(https://internshala.com/static/images/registration/employer/registration_new/images/banner/r767_banner.png)] bg-contain bg-no-repeat   bg-left'>
        <div className="left w-full h-[87vh] px-32 py-10 ">
          <h1 className='font-bold text-[7vh] tracking-tight '>Hire Interns & Freshers <span className='text-blue-500 font-extrabold'>Faster</span></h1>
          <h3 className='text-2xl'>Post Internships for Free Now</h3>

          <form
            className="form flex flex-col gap-4 w-[80vh] absolute right-[3%] top-[24%]"
            onSubmit={(e) => submitHandler(e)}
          >
            <h2 className="text-2xl font-bold mb-4">Create Account</h2>
            <div className="flex items-center gap-2">
              <input
                className="form__input bg-gray-200 py-2 px-4 rounded-md"
                name="firstname"
                type="text"
                placeholder="First Name"
                required
              />
              <input
                className="form__input bg-gray-200 py-2 px-4 rounded-md"
                name="lastname"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
            <input
                className="form__input bg-gray-200 py-2 px-4 rounded-md"
                name="organizationname"
                type="text"
                placeholder="Organization Name"
                required
              />
            <input
              className="form__input bg-gray-200 py-2 px-4 rounded-md"
              name="contact"
              type="tel"  // Use the tel type for contact numbers
              placeholder="Contact"
              required
            />
            <input
              className="form__input bg-gray-200 py-2 px-4 rounded-md"
              name="email"
              type="text"
              placeholder="Email"
              required
            />
            <input
              className="form__input bg-gray-200 py-2 px-4 rounded-md"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button
              id="button_h"
              type="submit"
              className="form__button button submit bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              SIGN UP
            </button>
            <span className="text-gray-600">
              Already have an account?{" "}
              <Link className="thicklink text-blue-500" to="/employe/signin">
                Sign In
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Employesignup;
