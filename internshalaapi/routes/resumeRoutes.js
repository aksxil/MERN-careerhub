const express = require("express");
const { resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addintern,
    editintern,
    deleteintern,
    addresp,
    editresp,
    deleteresp,
    addcourse,
    editcourse,
    deletecourse,
    addproject,
    editproject,
    deleteproject,
    addskill,
    editskill,
    deleteskill,
    addportfolio, editportfolio, deleteportfolio,
    addaccomplishment,
    editaccomplishment,
    deleteaccomplishment } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

//Get/

// Routes with isAuthenticated middleware
router.get("/", isAuthenticated, resume);
router.post("/add-edu", isAuthenticated, addeducation);
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);

router.post("/add-job", isAuthenticated, addjob);
router.post("/edit-job/:jobid", isAuthenticated, editjob);
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

router.post("/add-intern", isAuthenticated, addintern);
router.post("/edit-intern/:internid", isAuthenticated, editintern);
router.post("/delete-intern/:internid", isAuthenticated, deleteintern);

router.post("/add-resp", isAuthenticated, addresp);
router.post("/edit-resp/:respid", isAuthenticated, editresp);
router.post("/delete-resp/:respid", isAuthenticated, deleteresp);

router.post("/add-course", isAuthenticated, addcourse);
router.post("/edit-course/:courseid", isAuthenticated, editcourse);
router.post("/delete-course/:courseid", isAuthenticated, deletecourse);

router.post("/add-project", isAuthenticated, addproject);
router.post("/edit-project/:projectid", isAuthenticated, editproject);
router.post("/delete-project/:projectid", isAuthenticated, deleteproject);

router.post("/add-skill", isAuthenticated, addskill);
router.post("/edit-skill/:skillid", isAuthenticated, editskill);
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill);

router.post("/add-portfolio", isAuthenticated, addportfolio);
router.post("/edit-portfolio", isAuthenticated, editportfolio);
router.post("/delete-portfolio", isAuthenticated, deleteportfolio);

router.post("/add-accomplishment", isAuthenticated, addaccomplishment);
router.post("/edit-accomplishment/:accomplishmentid", isAuthenticated, editaccomplishment);
router.post("/delete-accomplishment/:accomplishmentid", isAuthenticated, deleteaccomplishment);





module.exports = router