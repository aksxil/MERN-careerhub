const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();

    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const { resume } = student;
    res.json({ message: "Secure Resume Page!", resume });
});


exports.addeducation = catchAsyncError(async (req, res, next) => {
    try {
        const student = await Student.findOne({ _id: { _id: req.id } }).exec();
        if (!student) {
            return next(new ErrorHandler("Student not found", 404));
        }
        student.resume.education.push({ ...req.body, id: uuidv4() });
        await student.save();
        res.json({ message: "Education Added!", resume: student.resume });
    } catch (error) {
        return next(error);
    }
});
  
  


exports.editeducation = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: { _id: req.id } }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const eduIndex = student.resume.education.findIndex(i=> i.id === req.params.eduid)
    student.resume.education[eduIndex] = {...student.resume.education[eduIndex],...req.body}
    await student.save();
    res.json({ message: "Education Updated!", resume: student.resume });
});

exports.deleteeducation = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const Filterededucation = student.resume.education.filter(i=> i.id !== req.params.eduid)
    student.resume.education = Filterededucation;
    await student.save();
    res.json({ message: "Education deleted", resume: student.resume });
});

exports.addjob = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Job Added!", resume: student.resume });
});

exports.editjob = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const jobIndex = student.resume.jobs.findIndex(job => job.id === req.params.jobid);
    if (jobIndex === -1) {
        return next(new ErrorHandler("Job not found", 404));
    }
    // Update the specific job with the merged data
    student.resume.jobs[jobIndex] = { ...student.resume.jobs[jobIndex], ...req.body };
    await student.save();
    res.json({ message: "Job Updated!", resume: student.resume });
});

exports.deletejob = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const Filteredjob = student.resume.jobs.filter(i=> i.id !== req.params.jobid)
    student.resume.jobs = Filteredjob;
    await student.save();
    res.json({ message: "Job deleted", resume: student.resume });
});

/// intern

exports.addintern = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "internship Added!", resume: student.resume });
});

exports.editintern = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const internIndex = student.resume.internships.findIndex(job => job.id === req.params.internid);
    if (internIndex === -1) {
        return next(new ErrorHandler("internship not found", 404));
    }
    // Update the specific job with the merged data
    student.resume.internships[internIndex] = { ...student.resume.internships[internIndex], ...req.body };
    await student.save();
    res.json({ message: "internship Updated!", resume: student.resume });
});

exports.deleteintern = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const Filteredintern = student.resume.internships.filter(i=> i.id !== req.params.internid)
    student.resume.internships = Filteredintern;
    await student.save();
    res.json({ message: "internship deleted", resume: student.resume });
});

//resp

exports.addresp = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "responsibilities Added!", resume: student.resume });
});

exports.editresp = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const respIndex = student.resume.responsibilities.findIndex(resp => resp.id === req.params.respid);
    if (respIndex === -1) {
        return next(new ErrorHandler("responsibilities not found", 404));
    }
    // Update the specific job with the merged data
    student.resume.responsibilities[respIndex] = { ...student.resume.responsibilities[respIndex], ...req.body };
    await student.save();
    res.json({ message: "responsibilities Updated!", resume: student.resume });
});

exports.deleteresp = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const Filteredresp = student.resume.responsibilities.filter(i=> i.id !== req.params.respid)
    student.resume.responsibilities = Filteredresp;
    await student.save();
    res.json({ message: "responsibilities deleted", resume: student.resume });
});

// Courses
exports.addcourse = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Course added!", resume: student.resume });
});

exports.editcourse = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const courseIndex = student.resume.courses.findIndex(course => course.id === req.params.courseid);
    if (courseIndex === -1) {
        return next(new ErrorHandler("Course not found", 404));
    }
    student.resume.courses[courseIndex] = { ...student.resume.courses[courseIndex], ...req.body };
    await student.save();
    res.json({ message: "Course updated!", resume: student.resume });
});

exports.deletecourse = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const filteredCourses = student.resume.courses.filter(course => course.id !== req.params.courseid);
    student.resume.courses = filteredCourses;
    await student.save();
    res.json({ message: "Course deleted", resume: student.resume });
});

// Projects
exports.addproject = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Project added!", resume: student.resume });
});

exports.editproject = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const projectIndex = student.resume.projects.findIndex(project => project.id === req.params.projectid);
    if (projectIndex === -1) {
        return next(new ErrorHandler("Project not found", 404));
    }
    student.resume.projects[projectIndex] = { ...student.resume.projects[projectIndex], ...req.body };
    await student.save();
    res.json({ message: "Project updated!", resume: student.resume });
});

exports.deleteproject = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const filteredProjects = student.resume.projects.filter(project => project.id !== req.params.projectid);
    student.resume.projects = filteredProjects;
    await student.save();
    res.json({ message: "Project deleted", resume: student.resume });
});

// Skills
exports.addskill = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Skill added!", resume: student.resume });
});

exports.editskill = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const skillIndex = student.resume.skills.findIndex(skill => skill.id === req.params.skillid);
    if (skillIndex === -1) {
        return next(new ErrorHandler("Skill not found", 404));
    }
    student.resume.skills[skillIndex] = { ...student.resume.skills[skillIndex], ...req.body };
    await student.save();
    res.json({ message: "Skill updated!", resume: student.resume });
});

exports.deleteskill = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const filteredSkills = student.resume.skills.filter(skill => skill.id !== req.params.skillid);
    student.resume.skills = filteredSkills;
    await student.save();
    res.json({ message: "Skill deleted", resume: student.resume });
});

// Accomplishments
exports.addaccomplishment = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Accomplishment added!", resume: student.resume });
});

exports.editaccomplishment = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const accomplishmentIndex = student.resume.accomplishments.findIndex(accomplishment => accomplishment.id === req.params.accomplishmentid);
    if (accomplishmentIndex === -1) {
        return next(new ErrorHandler("Accomplishment not found", 404));
    }
    student.resume.accomplishments[accomplishmentIndex] = { ...student.resume.accomplishments[accomplishmentIndex], ...req.body };
    await student.save();
    res.json({ message: "Accomplishment updated!", resume: student.resume });
});

exports.deleteaccomplishment = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById({ _id: req.id }).exec();
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }
    const filteredAccomplishments = student.resume.accomplishments.filter(accomplishment => accomplishment.id !== req.params.accomplishmentid);
    student.resume.accomplishments = filteredAccomplishments;
    await student.save();
    res.json({ message: "Accomplishment deleted", resume: student.resume });
});

exports.addportfolio = catchAsyncError(async (req, res, next) => {
    const { blogLink, githubProfile, playStoreDevAccount, behancePortfolio, otherWorkSample } = req.body;

    const student = await Student.findById(req.id);
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    student.resume.portfolio = {
        blogLink,
        githubProfile,
        playStoreDevAccount,
        behancePortfolio,
        otherWorkSample,
        id: uuidv4()
    };

    await student.save();
    res.json({ message: "Portfolio added!", resume: student.resume });
});

exports.editportfolio = catchAsyncError(async (req, res, next) => {
    const { blogLink, githubProfile, playStoreDevAccount, behancePortfolio, otherWorkSample } = req.body;

    const student = await Student.findById(req.id);
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    student.resume.portfolio = {
        blogLink,
        githubProfile,
        playStoreDevAccount,
        behancePortfolio,
        otherWorkSample
    };

    await student.save();
    res.json({ message: "Portfolio updated!", resume: student.resume });
});

exports.deleteportfolio = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById(req.id);
    if (!student) {
        return next(new ErrorHandler("Student not found", 404));
    }

    student.resume.portfolio = {};
    await student.save();
    res.json({ message: "Portfolio deleted", resume: student.resume });
});


