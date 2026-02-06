import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  randomJobs: [],
  randomInternships: [],

  jobDetails: {},
  internshipDetails: {},
  studentDetails: {},

  savedJobs: [],
  savedInternships: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ================= AUTH =================
    loaduser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
      state.error = null;
    },

    signout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // ================= RANDOM DATA =================
    loadRandomJobs: (state, action) => {
      state.randomJobs = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    loadRandomInternships: (state, action) => {
      state.randomInternships = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // ================= DETAILS =================
    loadJobDetails: (state, action) => {
      const { jobId, jobDetails } = action.payload;
      state.jobDetails[jobId] = jobDetails;
    },

    loadInternshipDetails: (state, action) => {
      const { internshipId, internshipDetails } = action.payload;
      state.internshipDetails[internshipId] = internshipDetails;
    },

    loadStudentDetails: (state, action) => {
      const { studentId, studentDetails } = action.payload;
      state.studentDetails[studentId] = studentDetails;
    },

    updateJobDetails: (state, action) => {
      state.jobDetails[action.payload.jobId] =
        action.payload.jobDetails;
    },

    updateInternshipDetails: (state, action) => {
      state.internshipDetails[action.payload.internshipId] =
        action.payload.internshipDetails;
    },

    setJobDetails: (state, action) => {
      state.jobDetails[action.payload.jobId] =
        action.payload.jobDetails;
    },

    // ================= SAVED =================
    fetchSavedJobsSuccess: (state, action) => {
      state.savedJobs = action.payload || [];
    },

    fetchSavedInternshipsSuccess: (state, action) => {
      state.savedInternships = action.payload || [];
    },

    removeSavedItem: (state, action) => {
      const { itemType, itemId } = action.payload;
      if (itemType === "job") {
        state.savedJobs = state.savedJobs.filter(
          (job) => job._id !== itemId
        );
      } else if (itemType === "internship") {
        state.savedInternships =
          state.savedInternships.filter(
            (intern) => intern._id !== itemId
          );
      }
    },

    // ================= UI =================
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

// EXPORT ACTIONS
export const {
  loaduser,
  signout,
  loadRandomJobs,
  loadRandomInternships,
  loadJobDetails,
  loadInternshipDetails,
  loadStudentDetails,
  updateJobDetails,
  updateInternshipDetails,
  setJobDetails,
  fetchSavedJobsSuccess,
  fetchSavedInternshipsSuccess,
  setLoading,
  setError,
  clearError,
  removeSavedItem,
} = userSlice.actions;

// EXPORT REDUCER
export default userSlice.reducer;
