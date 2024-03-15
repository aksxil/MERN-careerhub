import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncsignup } from "../../store/userActions";
import { toast } from "react-toastify";
import Navbar from "../Navbar"

const Signup = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    city: "",
    gender: "",
    password: ""
  });
  const [error, setError] = useState(user.error);
  const [flag, setFlag] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(asyncsignup(formData));
    setError(user.error);
    setFlag(1);
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/student/dashboard");
    }
  }, [user.isAuthenticated, navigate]);

  return (
    <div className="mainauthcont flex flex-col items-center justify-center min-h-screen bg-white">
      <Navbar/>
      <div id="formparent" className="mt-4 bg-white p-8 rounded-lg shadow-md w-1/2">
        <div className="crossauth text-gray-600" onClick={() => navigate("/")}>
          <i className="ri-add-fill"></i>
        </div>
        <form
          className="form flex flex-col gap-4"
          id="a-form"
          onSubmit={(e) => submitHandler(e)}
        >
          <h2 className="text-2xl font-bold mb-4">Create Student Account</h2>
          <div className="flex items-center gap-2">
            <input
              className="form__input bg-gray-200 py-2 px-4 rounded-md"
              name="firstname"
              type="text"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              className="form__input bg-gray-200 py-2 px-4 rounded-md"
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="form__input bg-gray-200 py-2 px-4 rounded-md"
            name="contact"
            type="text"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <input
            className="form__input bg-gray-200 py-2 px-4 rounded-md"
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="form__input bg-gray-200 py-2 px-4 rounded-md"
            name="city"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              className="form__input-radio"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            <label htmlFor="Male" className="mr-4">Male</label>

            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              className="form__input-radio"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              required
            />
            <label htmlFor="Female" className="mr-4">Female</label>

            <input
              type="radio"
              id="Other"
              name="gender"
              value="Other"
              className="form__input-radio"
              checked={formData.gender === "Other"}
              onChange={handleChange}
              required
            />
            <label htmlFor="Other">Other</label>
          </div>

          <input
            className="form__input bg-gray-200 py-2 px-4 rounded-md"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
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
            <Link className="thicklink text-blue-500" to="/signin">
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
