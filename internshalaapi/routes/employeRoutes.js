const express = require("express");
const { homepage,
    employeSignup,
    employeSignin,
    employeSignout,
    currentEmploye,
    employesendmail,
    employeforgetlink,
    employeresetPassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
    deleteJob,
    updateJob,
    updateInternshipPost,
    deleteInternshipPost,
    getJobApplicants,
    getInternshipApplicants,
    getStudentById,
    addShortlistedStudentJob,
    addShortlistedStudentInternship
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.get("/",homepage)

router.post("/current",isAuthenticated,currentEmploye)


//post employe
router.post("/signup", employeSignup)

//post employe
router.post("/signin", employeSignin)

//post employe
router.get("/signout",isAuthenticated, employeSignout)

//post employe/send mail
router.post("/send-mail", employesendmail)

//get employe forget
router.post("/forget-link/:id", employeforgetlink)

//resest password
router.post("/reset-password/:id", isAuthenticated, employeresetPassword)

//employe/update
router.post("/update/:id", isAuthenticated, employeupdate)

//employe/avatar
router.post("/avatar/:id", isAuthenticated, employeavatar)


//---------------------------------Internship-----------------------------------

//internship/create
router.post("/internship/create", isAuthenticated, createinternship)

//internship/read
router.post("/internship/read", isAuthenticated, readinternship)

//internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship)

//internship/update/:id
router.post("/internship/update/:id", isAuthenticated, updateInternshipPost);

//internship/delete/:id
router.delete("/internship/delete/:id", isAuthenticated, deleteInternshipPost);

//internship/create
router.post("/job/create", isAuthenticated, createjob)

//internship/read
router.post("/job/read", isAuthenticated, readjob)

//internship/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob)

//internship/update/:id
router.post("/job/update/:id", isAuthenticated, updateJob);

//internship/delete/:id
router.delete("/job/delete/:id", isAuthenticated, deleteJob);

router.get('/jobs/:jobId/applications', isAuthenticated,getJobApplicants )

router.get('/internships/:internshipId/applications', isAuthenticated,getInternshipApplicants )


router.get('/student-details/:id', isAuthenticated,getStudentById)

// Route to add a student as shortlisted for a job
router.post('/jobs/:jobId/addShortlisted/:studentId', addShortlistedStudentJob);

// Route to add a student as shortlisted for a internship
router.post('/internships/:internshipId/addShortlisted/:studentId', addShortlistedStudentInternship);







module.exports = router