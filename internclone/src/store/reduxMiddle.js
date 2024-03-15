// reduxMiddleware.js
import axios from 'axios';

const authMiddleware = store => next => action => {
  const state = store.getState();
  const token = state.user.token; // Replace with your actual state structure

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return next(action);
};

export default authMiddleware;
