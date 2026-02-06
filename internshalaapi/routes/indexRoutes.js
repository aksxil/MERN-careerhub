const express = require("express");
const router = express.Router();

const {
  homepage,

  // STUDENT AUTH
  StudentSignup,
  StudentSignin,
  StudentSignout,
  currentUser,

  // PASSWORD
  Studentsendmail,
  studentforgetlink,
  studentresetPassword,

  // PROFILE
  studentupdate,
  studentavatar,

  // APPLY
  applyjob,
  applyinternship,

  // FETCH
  getAllInternships,
  getSingleInternship,
  getAllJobs,
  getSingleJob,

  // APPLICATIONS
  getMyApplications,

  // SAVE
  saveJobInternship,
  getSavedJobsInternships,
  removeSavedItem,
} = require("../controllers/indexController");

const { isAuthenticated } = require("../middlewares/auth");

// ---------------- HOME ----------------
router.get("/", homepage);

// ---------------- CURRENT USER ----------------
router.get("/student", isAuthenticated, currentUser);

// ---------------- AUTH ----------------
router.post("/student/signup", StudentSignup);
router.post("/student/signin", StudentSignin);
router.get("/student/signout", isAuthenticated, StudentSignout);

// ---------------- PASSWORD ----------------
router.post("/student/send-mail", Studentsendmail);
router.post("/student/forget-link/:id", studentforgetlink);
router.post("/student/reset-password/:id", studentresetPassword);

// ---------------- PROFILE ----------------
router.post("/student/update/:id", isAuthenticated, studentupdate);
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

// ---------------- APPLY ----------------
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

// ---------------- PUBLIC DATA (VERY IMPORTANT FIX) ----------------
// ❌ removed isAuthenticated here
router.get("/internships", getAllInternships);
router.get("/internships/:id", getSingleInternship);
router.get("/jobs", getAllJobs);
router.get("/jobs/:id", getSingleJob);

// ---------------- APPLICATIONS ----------------
router.post("/myapplications", isAuthenticated, getMyApplications);

// ---------------- SAVED ----------------
router.post("/student/save", isAuthenticated, saveJobInternship);
router.get("/student/:studentId/saved", isAuthenticated, getSavedJobsInternships);
router.post("/remove/:userId/:itemType/:itemId", isAuthenticated, removeSavedItem);

module.exports = router;
