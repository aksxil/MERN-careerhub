import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloaduser } from '../../store/userActions';
import Navbar from '../Navbar';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(asyncloaduser());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div>
        {user.isAuthenticated ? (
          <div>
            {user.user ? (
              <h2>Welcome, {user.user.firstname}!</h2>
              // Display other user details as needed
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
        ) : (
          <h2>Please log in to see your details.</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
