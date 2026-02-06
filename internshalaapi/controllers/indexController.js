const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/JobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");

// ================= HOME =================
const homepage = catchAsyncError(async (req, res) => {
  res.json({ message: "Secure home page" });
});

// ================= CURRENT USER =================
const currentUser = catchAsyncError(async (req, res, next) => {
  if (!req.id) return next(new ErrorHandler("Unauthorized", 401));
  const student = await Student.findById(req.id);
  res.json({ student });
});

// ================= SIGNUP =================
const StudentSignup = catchAsyncError(async (req, res) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});

// ================= SIGNIN =================
const StudentSignin = catchAsyncError(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).select("+password");

  if (!student) return next(new ErrorHandler("User not found", 404));

  const isMatch = await student.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

  sendtoken(student, 200, res);
});

// ================= SIGNOUT =================
const StudentSignout = catchAsyncError(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// ================= SEND FORGOT MAIL =================
const Studentsendmail = catchAsyncError(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) return next(new ErrorHandler("User not found", 404));

  const url = `${process.env.FRONTEND_URL}/student/forget-link/${student._id}`;
  await sendmail(req, res, next, url);

  student.resetPasswordToken = "1";
  await student.save();

  res.json({ success: true });
});

// ================= RESET PASSWORD (LINK) =================
const studentforgetlink = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student || student.resetPasswordToken !== "1") {
    return next(new ErrorHandler("Invalid or expired link", 400));
  }

  student.password = req.body.password;
  student.resetPasswordToken = "0";
  await student.save();

  res.json({ message: "Password updated successfully" });
});

// ================= RESET PASSWORD (LOGGED IN) =================
const studentresetPassword = catchAsyncError(async (req, res) => {
  const student = await Student.findById(req.id);
  student.password = req.body.password;
  await student.save();
  sendtoken(student, 200, res);
});

// ================= UPDATE PROFILE =================
const studentupdate = catchAsyncError(async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

// ================= AVATAR =================
const studentavatar = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const file = req.files?.avatar;

  if (!file) return next(new ErrorHandler("Avatar required", 400));

  const modifiedFileName = `student-${Date.now()}${path.extname(file.name)}`;

  if (student.avatar?.fileId) {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  student.avatar = { fileId, url };
  await student.save();

  res.json({ success: true });
});

// ================= APPLY INTERNSHIP =================
const applyinternship = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const internship = await Internship.findById(req.params.internshipid);

  if (!internship) return next(new ErrorHandler("Internship not found", 404));

  if (!student.internships.includes(internship._id)) {
    student.internships.push(internship._id);
    internship.students.push(student._id);
  }

  await student.save();
  await internship.save();

  res.json({ success: true });
});

// ================= APPLY JOB =================
const applyjob = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id);
  const job = await Job.findById(req.params.jobid);

  if (!job) return next(new ErrorHandler("Job not found", 404));

  if (!student.jobs.includes(job._id)) {
    student.jobs.push(job._id);
    job.students.push(student._id);
  }

  await student.save();
  await job.save();

  res.json({ success: true });
});

// ================= GET ALL INTERNSHIPS =================
const getAllInternships = catchAsyncError(async (req, res) => {
  const internships = await Internship.find().populate("employe");
  res.json(internships);
});

// ================= GET SINGLE INTERNSHIP =================
const getSingleInternship = catchAsyncError(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).populate("employe");
  if (!internship) return next(new ErrorHandler("Internship not found", 404));
  res.json(internship);
});

// ================= GET ALL JOBS =================
const getAllJobs = catchAsyncError(async (req, res) => {
  const jobs = await Job.find().populate("employe");
  res.json(jobs);
});

// ================= GET SINGLE JOB =================
const getSingleJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findById(req.params.id).populate("employe");
  if (!job) return next(new ErrorHandler("Job not found", 404));
  res.json(job);
});

// ================= MY APPLICATIONS =================
const getMyApplications = catchAsyncError(async (req, res) => {
  const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships");

  res.json({
    jobs: student.jobs,
    internships: student.internships,
  });
});

// ================= SAVE JOB / INTERNSHIP =================
const saveJobInternship = catchAsyncError(async (req, res) => {
  const { itemId, itemType } = req.body;
  const student = await Student.findById(req.id);

  student.saved.push({ itemId, itemType });
  await student.save();

  res.json({ success: true });
});

// ================= GET SAVED ITEMS =================
const getSavedJobsInternships = catchAsyncError(async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  res.json(student.saved);
});

// ================= REMOVE SAVED ITEM =================
const removeSavedItem = catchAsyncError(async (req, res) => {
  const { userId, itemId } = req.params;

  const student = await Student.findById(userId);
  student.saved = student.saved.filter(
    (item) => item.itemId.toString() !== itemId
  );

  await student.save();
  res.json({ success: true });
});

// ✅ EXPORTS (ONLY HERE)
module.exports = {
  homepage,
  StudentSignup,
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
  removeSavedItem,
};
