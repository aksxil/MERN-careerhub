import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncempsignin } from "../../store/userActions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar"

const Employesignin = () => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState(user.error);
  const [flag, setFlag] = useState(0);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     await asyncsignin({
  //       email: e.target[0].value,
  //       password: e.target[1].value,
  //     })
  //   );
  //   setError(user.error);
  //   setFlag(1);
  // };


  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(asyncempsignin({
      email: e.target[0].value,
      password: e.target[1].value,
    }));
    setError(user.error);
    setFlag(1);
    toast.success('Employe Successfully Login');
  };
  

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/employe/dashboard");
    }
  }, [user.isAuthenticated, navigate]);

  useEffect(() => {
    if (flag) {
      console.log(user.error);
      console.log(user)
      if (user.error !== "can not access the resource") {
        toast.error(user.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }, [user.error, flag]);

  return (
    <div className="mainauthcont flex flex-col items-center h-screen bg-gray-100">
      <Navbar/>
      <div id="formparent" className="bg-white p-8 w-1/3 rounded-lg shadow-md mt-10">
        <div className="crossauth text-gray-600" onClick={() => navigate("/")}>
          <i className="ri-add-fill"></i>
        </div>
        <form
          className="form flex flex-col gap-4"
          id="a-form"
          onSubmit={(e) => submitHandler(e)}
        >
          <h2 className="text-2xl font-bold mb-4">Employe Login</h2>
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
            LOGIN
          </button>
          <span className="text-gray-600">
            Don't have an account?{" "}
            <Link className="thicklink text-blue-500" to="/employe/signup">
              Sign Up
            </Link>
          </span>
          <span className="text-gray-600">
            {" "}
            <Link className="thicklink text-blue-500" to="/employe/send-mail">
              Forgort Password
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Employesignin;
