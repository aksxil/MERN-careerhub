import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    randomJobs: [], // Initialize an array to store random jobs
    randomInternships: [], // Initialize an array to store random internships
    jobDetails: {}, // Object to store job details by job ID
    internshipDetails: {},
    studentDetails: {},
    savedJobs: [],
    savedInternships: [],
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        loadRandomJobs: (state, action) => {
            state.randomJobs = action.payload;
        },
        loadRandomInternships: (state, action) => {
            state.randomInternships = action.payload;
        },
        errors: (state, action) => {
            state.error = action.payload;
        },
        signout: (state, action) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        loadJobDetails: (state, action) => {
            // Store job details in the jobDetails object using job ID as key
            const { jobId, jobDetails } = action.payload;
            state.jobDetails[jobId] = jobDetails;
        },
        loadInternshipDetails: (state, action) => {
            const { internshipId, internshipDetails } = action.payload; // Corrected to 'internshipId'
            // Use the internship ID as the key to store the details
            state.internshipDetails[internshipId] = internshipDetails;
        },
        loadStudentDetails: (state, action) => {
            const { studentId, studentDetails } = action.payload;
            state.studentDetails[studentId] = studentDetails;
        },
        // Add a reducer to handle updating job details
        updateJobDetails: (state, action) => {
        state.jobDetails[action.payload.jobId] = action.payload.jobDetails;
      },
      // Add a reducer to handle updating job details
      updateInternshipDetails: (state, action) => {
        state.internshipDetails[action.payload.internshipId] = action.payload.internshipDetails;
      },
      setJobDetails: (state, action) => {
        state.jobDetails[action.payload.jobId] = action.payload.jobDetails;
      }, 
      fetchSavedJobsSuccess(state, action) {
        state.savedJobs = action.payload;
      },
      fetchSavedInternshipsSuccess(state, action) {
        state.savedInternships = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload;
      },
      setError(state, action) {
        state.error = action.payload;
      },
      clearError(state) {
        state.error = null;
      },
      removeSavedItem: (state, action) => {
        const { itemType, itemId } = action.payload;
        if (itemType === 'job') {
            state.savedJobs = state.savedJobs.filter(job => job._id !== itemId);
        } else if (itemType === 'internship') {
            state.savedInternships = state.savedInternships.filter(internship => internship._id !== itemId);
        }
    },
        
    },
});

// Exporting action creators
export const { loaduser, loadRandomJobs, loadRandomInternships, errors, signout , loadJobDetails , loadInternshipDetails, loadStudentDetails, updateJobDetails, updateInternshipDetails, setJobDetails,
    fetchSavedJobsSuccess, fetchSavedInternshipsSuccess, setLoading, setError, clearError,removeSavedItem } = userSlice.actions;

// Exporting the reducer
export default userSlice.reducer;
