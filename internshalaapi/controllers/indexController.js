const { userInfo } = require("os")
const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Student = require("../models/studentModel")
const Internship = require("../models/internshipModel")
const Job = require("../models/JobModel")
const ErrorHandler = require("../utils/ErrorHandler")
const { sendtoken } = require("../utils/SendToken")
const { sendmail } = require("../utils/nodemailer")
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path")
const Employe = require("../models/employeModel")
// const Internship = require("../models/internshipModel")
// const Job = require("../models/JobModel")


exports.homepage = catchAsyncError(async (req, res, next) => {
  res.json({ message: "Secure home page" })
})

exports.currentUser = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  res.json({ student })
})


exports.StudentSignup = catchAsyncError(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res)
})

exports.StudentSignin = catchAsyncError(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
  console.log(student)
  if (!student) {
    return next(new ErrorHandler("User not found with this email address", 404, "NotFoundError"));
  }
  const isMatch = await student.comparepassword(req.body.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect email or password", 401, "AuthenticationError"));
  }
  sendtoken(student, 200, res);
});


exports.StudentSignout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully signed out" }); // Corrected the message
});


exports.Studentsendmail = catchAsyncError(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec()

  if (!student) {
    return next(new ErrorHandler("User not found with this email address", 404, "NotFoundError"));
  };

  const frontendURL = 'http://localhost:5173'; // Set the frontend URL here
  const url = `${frontendURL}/student/forget-link/${student._id}`;
  sendmail(req, res, next, url)
  student.resetPasswordToken = "1";
  await student.save()
  res.json({ student, url })
})


exports.studentforgetlink = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();

  if (!student) {
    return next(new ErrorHandler("User not found with this ID", 404, "NotFoundError"));
  }

  if (student.resetPasswordToken === "1") {
    // Use the assignment operator (=) instead of equality operator (==)
    student.resetPasswordToken = "0";
    student.password = req.body.password;

    try {
      await student.save();
      res.status(200).json({
        message: "Password successfully changed"
      });
    } catch (error) {
      return next(new ErrorHandler("Error saving password", 500, "InternalServerError"));
    }
  } else {
    return next(new ErrorHandler("Invalid Password Link! Please Try again", 500));
  }
});


exports.studentresetPassword = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.password = req.body.password
  await student.save();
  sendtoken(student, 200, res);
});

exports.studentupdate = catchAsyncError(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Student updated Successfully!",
  })
})

exports.studentavatar = catchAsyncError(async (req, res, next) => {
  try {
    const student = await Student.findById(req.id).exec();
    const file = req.files.avatar;

    if (!file) {
      return res.status(400).json({ success: false, message: "Avatar file is missing" });
    }
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (student.avatar.fileId !== "") {
      await imagekit.deleteFile(student.avatar.fileId);
    }

    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });

    student.avatar = {
      fileId,
      url,
    };

    await student.save();

    res.status(200).json({
      success: true,
      message: "Profile updated!",
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// exports.studentavatar = catchAsyncError(async (req, res, next) => {
//   const student = await Student.findById(req.params.id).exec();

//   if (!student) {
//     return next(new ErrorHandler("User not found with this ID", 404, "NotFoundError"));
//   }

//   const file = req.files.avatar;

//   // Check if the avatar property exists before accessing fileId
//   if (student.avatar && student.avatar.fileId !== "") {
//     try {
//       await imagekit.deleteFile(student.avatar.fileId);
//     } catch (error) {
//       return next(new ErrorHandler("Error deleting previous avatar", 500, "InternalServerError"));
//     }
//   }

//   const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

//   try {
//     const { fileId, url } = await imagekit.upload({
//       file: file.data,
//       fileName: modifiedFileName
//     });

//     student.avatar = {
//       fileId,
//       url: `/student/avatar/${student._id}`  // Corrected URL construction
//     };

//     await student.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated!",
//     });
//   } catch (error) {
//     return next(new ErrorHandler("Error uploading avatar or saving to database", 500, "InternalServerError"));
//   }
// });

//--------------apply internship---------------------

exports.applyinternship = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipid)
  student.internships.push(internship._id)
  internship.students.push(student._id)
  await student.save();
  await internship.save()
  res.json({ student })
})


//--------------apply job----------------------------

exports.applyjob = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobid)
  student.jobs.push(job._id)
  job.students.push(student._id)
  await student.save();
  await job.save()
  res.json({ student })
})

/////////////////

// Controller function to fetch all internships
exports.getAllInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find().populate('employe');
    res.status(200).json({ success: true, data: internships });
  } catch (error) {
    // Handle error
    next(error);
  }
};

// Controller function to fetch a single internship by ID
exports.getSingleInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id).populate('employe');
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    // Handle error
    next(error);
  }
};

// Controller function to fetch all jobs
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate('employe');
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    // Handle error
    next(error);
  }
};

// Controller function to fetch a single job by ID
exports.getSingleJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('employe');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    console.log("Hellooo")
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    // Handle error
    next(error);
  }
};


exports.getMyApplications = async (req, res, next) => {
  try {
    // Fetch the student's applied jobs and internships with population
    const student = await Student.findById(req.id).populate({
      path: 'jobs',
      populate: {
        path: 'employe',
        model: 'employe', // Correct the model name to match your Employe model
        select: 'organizationLogo organizationname firstname' // Select the fields you want to populate
      }
    }).populate('internships');
    
    // Send the populated jobs and internships in the response
    res.json({
      jobs: student.jobs,
      internships: student.internships
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to save a job or internship for a student
// Controller function to save a job or internship for a student
exports.saveJobInternship = async (req, res) => {
  try {
    const { studentId, itemId, itemType } = req.body;

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Find the job or internship by ID based on the itemType
    let item;
    if (itemType === 'job') {
      item = await Job.findById(itemId);
    } else if (itemType === 'internship') {
      item = await Internship.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ error: 'Job/Internship not found' });
    }

    // Add the job/internship ID to the appropriate array in the student model
    if (itemType === 'job') {
      student.savedJobs.push(itemId);
    } else if (itemType === 'internship') {
      student.savedInternships.push(itemId);
    }
    
    // Save the updated student object
    await student.save();

    res.status(201).json({ message: 'Job/Internship saved successfully' });
  } catch (error) {
    console.error('Error saving job/internship:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get saved jobs and internships for a student
exports.getSavedJobsInternships = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Retrieve the saved jobs for the student
    const savedJobs = await Job.find({ _id: { $in: student.savedJobs } }).populate("employe");

    // Retrieve the saved internships for the student
    const savedInternships = await Internship.find({ _id: { $in: student.savedInternships } }).populate("employe");

    // Combine and return the saved jobs and internships
    const savedJobsAndInternships = [...savedJobs, ...savedInternships];

    res.status(200).json(savedJobsAndInternships);
  } catch (error) {
    console.error('Error getting saved jobs/internships:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to remove a saved job or internship for a student
exports.removeSavedItem = async (req, res) => {
  try {
    const { itemId, itemType, userId } = req.params;

    // Find the student by ID
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Determine the array to update based on itemType (job or internship)
    let savedItemsArray;
    if (itemType === 'job') {
      savedItemsArray = student.savedJobs;
    } else if (itemType === 'internship') {
      savedItemsArray = student.savedInternships;
    } else {
      return res.status(400).json({ error: 'Invalid item type' });
    }

    // Check if the item to remove exists in the student's saved items
    const itemIndex = savedItemsArray.indexOf(itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found in saved items' });
    }

    // Remove the item from the saved items array
    savedItemsArray.splice(itemIndex, 1);

    // Save the student's updated document
    await student.save();

    // Respond with success message
    return res.status(200).json({ message: 'Saved item removed successfully' });
  } catch (error) {
    console.error('Error removing saved item:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
