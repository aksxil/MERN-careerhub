import axios from "../axios";
import { loaduser, errors, signout , loadJobDetails, loadInternshipDetails, loadRandomInternships, loadRandomJobs, loadStudentDetails, updateInternshipDetails, updateJobDetails, setJobDetails,setLoading, setError, clearError, fetchSavedJobsSuccess, fetchSavedInternshipsSuccess, removeSavedItem} from "./userSlice";
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from './forgotSlice'
import { toast } from "react-toastify";

const loadUserDetails = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/student');
    dispatch(loaduser(data.student));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};
const loadEmployeDetails = () => async (dispatch) => {
  try {
    const { data } = await axios.post('/employe/current');
    dispatch(loaduser(data.employe));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};
// export const asyncsignup = (newuser) => async (dispatch) => {
//   try {
//     const { data } = await axios.post("/student/signup", newuser);
//     dispatch(loaduser(data.user));
//   } catch (err) {
//     dispatch(errors(err.response.data.message));
//   }
// };

export const asyncsignup = (newuser) => async (dispatch) => {
  try {
    const {data} = await axios.post("/student/signup", newuser);
    dispatch(loaduser(data.user)); // Dispatch action to update user state upon successful signup
  } catch (err) {
    // If there's an error response from the server, dispatch the error message
    if (err.response && err.response.data && err.response.data.message) {
      dispatch(errors(err.response.data.message));
    } else {
      // If there's no error message in the response, dispatch a generic error
      dispatch(errors("An error occurred during signup."));
    }
  }
};
// export const  = (newuser) => async (dispatch) => {
//   try {
//     const { data } = await axios.post("/employe/signup", newuser);
//     dispatch(loaduser(data.user));
//   } catch (err) {
//     dispatch(errors(err.response.data.message));
//   }
// };

export const asyncempsignup = (newuser) => async (dispatch) => {
  try {
    const {data} = await axios.post("/employe/signup", newuser);
    dispatch(loaduser(data.user)); // Dispatch action to update user state upon successful signup
  } catch (err) {
    // If there's an error response from the server, dispatch the error message
    if (err.response && err.response.data && err.response.data.message) {
      dispatch(errors(err.response.data.message));
    } else {
      // If there's no error message in the response, dispatch a generic error
      dispatch(errors("An error occurred during signup."));
    }
  }
};
export const asyncempsignin = (newuser) => async (dispatch) => {
  try {
    const { data } = await axios.post("/employe/signin", newuser, { withCredentials: true });
    dispatch(loaduser(data.employe));
    console.log(data.employe)
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asyncsignin = (newuser) => async (dispatch) => {
  try {
    const { data } = await axios.post("/student/signin", newuser, { withCredentials: true });
    dispatch(loaduser(data.user));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const asyncloaduser = () => async (dispatch) => {
  dispatch(loadUserDetails());
};
export const asyncloademploye = () => async (dispatch) => {
  dispatch(loadEmployeDetails());
};
export const asyncsignout = () => async (dispatch) => {
  try {
    await axios.get("/student/signout");
    dispatch(signout());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};

export const updateUserDetails = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.post(`/student/update/${id}`, updatedUserData,{ withCredentials: true});
    // dispatch(loaduser(response.data.user));
    dispatch(asyncloaduser(response.data.user));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};
export const updateEmployeDetails = (id, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.post(`/employe/update/${id}`, updatedUserData,{ withCredentials: true});
    // dispatch(loaduser(response.data.user));
    dispatch(asyncloademploye(response.data.employe));
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};


export const uploadAvatar = (userId, formData) => async (dispatch) => {
  try {
    const response = await axios.post(`/student/avatar/${userId}`, formData);
    // dispatch(loaduser(response.data.user));
    dispatch(asyncloaduser(response.data.user));
  } catch (err) {
    dispatch(errors(err.response.data.message));
    throw err;
  }
};
export const uploadOrganizationLogo = (userId, formData) => async (dispatch) => {
  try {
    const response = await axios.post(`/employe/avatar/${userId}`, formData);
    // dispatch(loaduser(response.data.user));
    dispatch(asyncloademploye(response.data.employe));
  } catch (err) {
    dispatch(errors(err.response.data.message));
    throw err;
  }
};
export const getresetlink = (e) => async () => {
  try {
    await axios.post("/send-mail", { email: e.email });
    toast.success("Email sent!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (err) {
    toast.error("User not found!", {
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
};

export const addEducation = (educationData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-edu', educationData,{ withCredentials: true});
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteEducation = (educationId) => async (dispatch) => {
  try {
    // Make a request to delete the education item by its ID
    await axios.post(`/resume/delete-edu/${educationId}`);
    // If successful, dispatch an action to reload user data
    dispatch(asyncloaduser());
  } catch (error) {
    // If there's an error, dispatch an action to set the error message
    dispatch(errors(error.response.data.message));
    throw error; // Rethrow the error to handle it where the action is dispatched
  }
};

export const updateEducation = (educationData) => async (dispatch) => {
  try {
    // Make a request to update education data
    const response = await axios.post(`/resume/edit-edu/${educationData.id}`, educationData);

    // Assuming your API returns updated user data
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    // Dispatch an error action if the request fails
    dispatch(errors(error.response.data.message));
    throw error; // Rethrow the error to handle it where the action is dispatched
  }
};


export const addInternship = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-intern', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteInternship = (internshipId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-intern/${internshipId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updateInternship = (id,internshipData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-intern/${id}`, internshipData);
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};
export const addJob = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-job', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};
export const deleteJob = (jobId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-job/${jobId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};
export const updateJob = (jobId, jobData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-job/${jobId}`, jobData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};
export const addResponsibility = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-resp', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};
export const deleteRespo = (respoId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-resp/${respoId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updateRespo = (respoId, respoData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-resp/${respoId}`, respoData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const addTraining = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-course', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteTraining = (trainingId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-course/${trainingId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updateTraing = (trainingId, trainingData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-course/${trainingId}`, trainingData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};


export const addProject = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-project', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-project/${projectId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updateProject = (projectId, projectData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-project/${projectId}`, projectData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const addSkill = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-skill', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteSkill = (skillId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-skill/${skillId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updateSkill = (skillId, skillData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-skill/${skillId}`, skillData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const addPortfolio = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-portfolio', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updatePortfolio = (portfolioData) => async (dispatch) => {
  try {
    const response = await axios.post('/resume/edit-portfolio', portfolioData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const addAccom = (formData) => async (dispatch) => {
  try {
    await axios.post('/resume/add-accomplishment', formData, { withCredentials: true });
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteAccom = (accomId) => async (dispatch) => {
  try {
    await axios.post(`/resume/delete-accomplishment/${accomId}`);
    dispatch(asyncloaduser());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const updateAccom = (accomId, accomData) => async (dispatch) => {
  try {
    const response = await axios.post(`/resume/edit-accomplishment/${accomId}`, accomData); 
    dispatch(asyncloaduser(response.data.user));
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

// export const addJobPost = (formData) => async (dispatch) => {
//   try {
//     await axios.post('/employe/job/create', formData, { withCredentials: true });
//     dispatch(asyncloademploye());
//   } catch (error) {
//     dispatch(errors(error.response.data.message));
//     throw error;
//   }
// };
export const addJobPost = (jobData) => async (dispatch)=> {
  try {
    const res = await axios.post('/employe/job/create', jobData);
    dispatch(asyncloademploye());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const addInternshipPost = (internshipData) => async (dispatch)=> {
  try {
    const res = await axios.post('/employe/internship/create', internshipData);
    dispatch(asyncloademploye());
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const fetchJobDetails = (jobId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/employe/job/read/${jobId}`); // Fetch job details by job ID
    // console.log(data)
    dispatch(loadJobDetails({ jobId, jobDetails: data })); // Dispatch action to load job details into Redux state
  } catch (error) {
    // Handle error
    console.error('Error fetching job details:', error);
  }
};

export const fetchJobDetailsStu = (jobId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/jobs/${jobId}`); // Fetch job details by job ID using GET request
    // console.log(data)
    dispatch(loadJobDetails({ jobId, jobDetails: data }));
    // console.log(jobDetails) // Dispatch action to load job details into Redux state
  } catch (error) {
    // Handle error
    console.error('Error fetching job details:', error);
  }
};

export const fetchInternDetailsStu = (internshipId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/internships/${internshipId}`); // Fetch internship details by ID
    console.log(data)
    dispatch(loadInternshipDetails({ internshipId, internshipDetails: data })); // Dispatch action to load internship details into Redux state
  } catch (error) {
    // Handle error
    console.error('Error fetching internship details:', error);
  }
};


export const fetchInternshipDetails = (internshipId) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/employe/internship/read/${internshipId}`); // Fetch internship details by ID
    // console.log(data.internship.employe.firstname)
    dispatch(loadInternshipDetails({ internshipId, internshipDetails: data.internship })); // Dispatch action to load internship details into Redux state
  } catch (error) {
    // Handle error
    console.error('Error fetching internship details:', error);
  }
};



export const updateJobPost = (jobId, jobData) => async (dispatch) => {
  try {
    const response = await axios.post(`/employe/job/update/${jobId}`, jobData); 
    // Dispatch setJobDetails action to update job details in Redux store
    dispatch(setJobDetails({ jobId, jobDetails: response.data }));
  } catch (error) {
    // Handle error
    throw error;
  }
};
export const deleteJobPost = (jobId, callback) => async (dispatch) => {
  try {
    const response = await axios.delete(`/employe/job/delete/${jobId}`); 
    dispatch(asyncloademploye());
    // Execute callback function after successful deletion
    if (callback && typeof callback === 'function') {
        callback();
    }
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};



export const updateInternshipPost = (internshipId, internshipData) => async (dispatch) => {
  try {
    const response = await axios.post(`/employe/internship/update/${internshipId}`, internshipData); 
    dispatch(asyncloademploye());
    dispatch(updateInternshipDetails())
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};

export const deleteInternshipPost = (internshipId, callback) => async (dispatch) => {
  try {
    const response = await axios.delete(`/employe/internship/delete/${internshipId}`); 
    dispatch(asyncloademploye());
    // Execute callback function after successful deletion
    if (callback && typeof callback === 'function') {
        callback();
    }
  } catch (error) {
    dispatch(errors(error.response.data.message));
    throw error;
  }
};



export const fetchRandomJobs = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/jobs'); // Assuming the endpoint for fetching random jobs is /api/randomJobs
    dispatch(loadRandomJobs(data)); // Dispatch action to load random jobs into Redux state
  } catch (error) {
    // Handle error
    dispatch(errors(error.message));
    console.error('Error fetching random jobs:', error);
  }
};

export const fetchRandomInternships = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/internships'); // Assuming the endpoint for fetching random internships is /api/randomInternships
    dispatch(loadRandomInternships(data)); // Dispatch action to load random internships into Redux state
  } catch (error) {
    // Handle error
    dispatch(errors(error.message));
    console.error('Error fetching random internships:', error);
  }
};



export const applyForJob = (jobId) => async (dispatch) => {
  try {
    const response = await axios.post(`/student/apply/job/${jobId}`);
    // Dispatch an action to inform the Redux store about the application status
    dispatch(applicationSuccess(response.data));
  } catch (error) {
    // Dispatch an action to handle error cases
    dispatch(applicationFailure(error.message));
  }
};

export const applyForInternship = (internshipId) => async (dispatch) => {
  try {
    const response = await axios.post(`/student/apply/internship/${internshipId}`);
    // Dispatch an action to inform the Redux store about the application status
    dispatch(applicationSuccess(response.data));
  } catch (error) {
    // Dispatch an action to handle error cases
    dispatch(applicationFailure(error.message));
  }
};

// Define action creators for application success and failure
const applicationSuccess = (data) => ({
  type: 'user/applicationSuccess',
  payload: data,
});

const applicationFailure = (error) => ({
  type: 'user/applicationFailure',
  payload: error,
});


// Action to fetch user's applied jobs and internships
export const fetchMyApplications = () => async (dispatch) => {
  try {
    // Fetch the user's applied jobs and internships from the backend
    const res = await axios.post('/myapplications');
    // Assuming the response contains an object with 'jobs' and 'internships' arrays
    const { jobs, internships } = res.data;
    // Dispatch actions to load job and internship details
    jobs.forEach(job => {
      dispatch(loadJobDetails({ jobId: job._id, jobDetails: job }));
    });

    internships.forEach(internship => {
      dispatch(loadInternshipDetails({ internshipId: internship._id, internshipDetails: internship }));
    });
  } catch (error) {
    dispatch(errors(error.response.data));
  }
};


export const fetchStudentDetails = (studentId) => {
  return async (dispatch) => {
      try {
          const response = await axios.get(`/employe/student-details/${studentId}`);
          const student = response.data;
          console.log(student)
          if (student.message && student.message === 'Student not found') {
              // Handle the case where the student is not found
              // For example, you can return null or an empty object
              return null;
          }
          dispatch(loadStudentDetails({ studentId, studentDetails: student }));
          return student;
      } catch (error) {
          throw error;
      }
  };
};

// Action to add a student as shortlisted for a job
export const addShortlistedStudent = (jobId, studentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/employe/jobs/${jobId}/addShortlisted/${studentId}`);
      console.log(response.data); // Log success message
      // Dispatch any additional actions or handle success as needed
    } catch (error) {
      console.error('Error adding student as shortlisted:', error);
      // Handle error or dispatch failure action
    }
  };
};

// Action to add a student as shortlisted for a job
export const addShortlistedStudentInternship = (internshipId, studentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/employe/internships/${internshipId}/addShortlisted/${studentId}`);
      console.log(response.data); // Log success message
      // Dispatch any additional actions or handle success as needed
    } catch (error) {
      console.error('Error adding student as shortlisted:', error);
      // Handle error or dispatch failure action
    }
  };
};




// Action types
export const SAVE_JOB_INTERNSHIP_REQUEST = 'SAVE_JOB_INTERNSHIP_REQUEST';
export const SAVE_JOB_INTERNSHIP_SUCCESS = 'SAVE_JOB_INTERNSHIP_SUCCESS';
export const SAVE_JOB_INTERNSHIP_FAILURE = 'SAVE_JOB_INTERNSHIP_FAILURE';

// Action creators
export const saveJobInternshipRequest = () => ({
  type: SAVE_JOB_INTERNSHIP_REQUEST,
});

export const saveJobInternshipSuccess = () => ({
  type: SAVE_JOB_INTERNSHIP_SUCCESS,
});

export const saveJobInternshipFailure = (error) => ({
  type: SAVE_JOB_INTERNSHIP_FAILURE,
  payload: error,
});

// Thunk action creator to save a job or internship
export const saveJobInternship = (studentId, itemId, itemType) => async (dispatch) => {
  dispatch(saveJobInternshipRequest());
  try {
    await axios.post(`/student/save`, { studentId, itemId, itemType });
    dispatch(saveJobInternshipSuccess());
  } catch (error) {
    dispatch(saveJobInternshipFailure(error.message));
  }
};

export const fetchSavedJobsAndInternships = (studentId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await axios.get(`/student/${studentId}/saved`);
    const data = response.data; // Access the data property of the response object
    if (!data) {
      throw new Error('Failed to fetch saved jobs and internships');
    }

    const savedJobs = data.filter(item => item.type === 'job'); // Assuming job documents have a 'type' field
    const savedInternships = data.filter(item => item.type === 'internship'); // Assuming internship documents have a 'type' field

    dispatch(fetchSavedJobsSuccess(savedJobs));
    dispatch(fetchSavedInternshipsSuccess(savedInternships));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};


export const removeSavedItemAsync = (userId, itemType, itemId) => async (dispatch) => {
  try {
    const response = await axios.post(`/remove/${userId}/${itemType}/${itemId}`);
    if (response.status === 200) {
      dispatch(removeSavedItem({ itemType, itemId, userId }));
    } else {
      throw new Error('Failed to remove saved item');
    }
  } catch (error) {
    console.error('Error removing saved item:', error);
    dispatch(setError('Failed to remove saved item'));
    throw error;
  }
};


// Action types
const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

// Action creators
const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
});

const resetPasswordSuccess = (message) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: message
});

const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error
});

// Thunk action to reset the password
export const studentResetPassword = (studentId, password) => async (dispatch) => {
  dispatch(resetPasswordRequest());

  try {
    const response = await axios.post(`/student/reset-password/${studentId}`, { password });

    dispatch(resetPasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.response.data.error));
    throw error;
  }
};

// Thunk action to reset the password
export const employeResetPassword = (employeId, password) => async (dispatch) => {
  dispatch(resetPasswordRequest());

  try {
    const response = await axios.post(`/employe/reset-password/${employeId}`, { password });

    dispatch(resetPasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(resetPasswordFailure(error.response.data.error));
    throw error;
  }
};

// Action creator to send forgot password link
export const sendForgotPasswordLink = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());

  try {
      // Make API call to send forgot password link
      await axios.post('/student/send-mail', { email });
      // Dispatch forgot password success action
      dispatch(forgotPasswordSuccess());
  } catch (error) {
      // Handle error
      console.error('Error sending forgot password link:', error);
      // Dispatch forgot password failure action with error message
      dispatch(forgotPasswordFailure(error.response.data.error));
  }
};

// Action creator to send forgot password link
export const sendForgotPasswordLinkEm = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());

  try {
      // Make API call to send forgot password link
      await axios.post('/employe/send-mail', { email });
      // Dispatch forgot password success action
      dispatch(forgotPasswordSuccess());
  } catch (error) {
      // Handle error
      console.error('Error sending forgot password link:', error);
      // Dispatch forgot password failure action with error message
      dispatch(forgotPasswordFailure(error.response.data.error));
  }
};