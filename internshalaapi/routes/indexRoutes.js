const express = require("express");
const { homepage,
    StudentSignup ,
    StudentSignin,
    StudentSignout,
    currentUser,
    Studentsendmail,
    studentforgetlink,
    studentresetPassword,
    studentupdate,
    studentavatar,
    applyjob,
    applyinternship,
    getAllInternships,
    getSingleInternship,
    getAllJobs,
    getSingleJob,
    getMyApplications,
    saveJobInternship,
    getSavedJobsInternships,
    removeSavedItem
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/",homepage)

router.get("/student",isAuthenticated,currentUser)


//post Student
router.post("/student/signup", StudentSignup)

//post Student
router.post("/student/signin", StudentSignin)

//post Student
router.get("/student/signout",isAuthenticated, StudentSignout)

//post Student/send mail
router.post("/student/send-mail", Studentsendmail)

//get student forget
router.post("/student/forget-link/:id", studentforgetlink)

//resest password
router.post("/student/reset-password/:id", isAuthenticated, studentresetPassword)

//Student/update
router.post("/student/update/:id", isAuthenticated, studentupdate)

//Student/avatar
router.post("/student/avatar/:id", isAuthenticated, studentavatar)


//----------------------------Apply Internship----------------------------

///student/apply/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship)

//----------------------------Apply Job----------------------------

///student/apply/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob)

//////////////////////////////

// Route for fetching all internships
router.get('/internships',isAuthenticated, getAllInternships);

// Route for fetching a single internship
router.get('/internships/:id',isAuthenticated, getSingleInternship);

// Route for fetching all jobs
router.get('/jobs',isAuthenticated, getAllJobs);

// Route for fetching a single job
router.get('/jobs/:id',isAuthenticated, getSingleJob);


router.post('/myapplications', isAuthenticated, getMyApplications)

// Route to save a job or internship for a student
router.post('/student/save', saveJobInternship);

// Route to get saved jobs and internships for a student
router.get('/student/:studentId/saved', getSavedJobsInternships);

router.post('/remove/:userId/:itemType/:itemId', removeSavedItem);


module.exports = router