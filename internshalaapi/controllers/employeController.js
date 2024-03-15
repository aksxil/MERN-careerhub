const { userInfo } = require("os")
const { catchAsyncError } = require("../middlewares/catchAsyncError")
const Employe = require("../models/employeModel")
const ErrorHandler = require("../utils/ErrorHandler")
const { sendtoken, sendtokenemploy } = require("../utils/SendToken")
const { sendmail } = require("../utils/nodemailer")
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path")
const Internship = require("../models/internshipModel")
const Job = require("../models/JobModel")
const Student = require("../models/studentModel")



exports.homepage = catchAsyncError(async (req, res, next) => {
     res.json({ message: "Secure Employee page" })
})

exports.currentEmploye = catchAsyncError(async (req, res, next) => {
     const employe = await Employe.findById(req.id).exec();
     res.json({ employe });
});



exports.employeSignup = catchAsyncError(async (req, res, next) => {
     const employe = await new Employe(req.body).save();
     sendtoken(employe, 201, res)
})



exports.employeSignin = catchAsyncError(async (req, res, next) => {
     const foundEmploye = await Employe.findOne({ email: req.body.email }).select("+password").exec();

     if (!foundEmploye) {
          return next(new ErrorHandler("User not found with this email address", 404, "NotFoundError"));
     }

     const isMatch = foundEmploye.comparePassword(req.body.password);
     if (!isMatch) {
          return next(new ErrorHandler("Incorrect email or password", 401, "AuthenticationError"));
     }
     console.log('Request Email:', req.body.email);
     console.log('Employe:', foundEmploye);

     sendtokenemploy(foundEmploye, 200, res);
});


exports.employeSignout = catchAsyncError(async (req, res, next) => {
     res.clearCookie("token");
     res.json({ message: "Successfully signed out" });
});


exports.employesendmail  = catchAsyncError(async (req, res, next) => {
     const employe = await Employe.findOne({email: req.body.email}).exec()

     if (!employe) {
          return next(new ErrorHandler("User not found with this email address", 404, "NotFoundError"));
     };
     const frontendURL = 'http://localhost:5173'; // Set the frontend URL here

     const url = `${frontendURL}/employe/forget-link/${employe._id}`;
   sendmail(req,res,next,url)
   employe.resetPasswordToken ="1";
   await employe.save()
    res.json({employe,url})
})


exports.employeforgetlink = catchAsyncError(async (req, res, next) => {
     const employe = await Employe.findById(req.params.id).exec();
   
     if (!employe) {
       return next(new ErrorHandler("User not found with this ID", 404, "NotFoundError"));
     }
   
     if (employe.resetPasswordToken === "1") {
       // Use the assignment operator (=) instead of equality operator (==)
       employe.resetPasswordToken = "0";
       employe.password = req.body.password;
   
       try {
         await employe.save();
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

   
   exports.employeresetPassword = catchAsyncError(async (req, res, next) => {
     const employe = await Employe.findById(req.id).exec();
      employe.password = req.body.password
      await employe.save();
      sendtoken(employe, 200, res);
   });

   exports.employeupdate = catchAsyncError(async (req, res, next) => {
     await Employe.findByIdAndUpdate(req.params.id,req.body).exec();
     res.status(200).json({
          success:true,
          message:"employe updated Successfully!",
     })
})


exports.employeavatar = catchAsyncError(async (req, res, next) => {
  try {
    const employe = await Employe.findById(req.id).exec();
    const file = req.files.organizationLogo;

    if (!file) {
      return res.status(400).json({ success: false, message: "Avatar file is missing" });
    }
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (employe.organizationLogo.fileId !== "") {
      await imagekit.deleteFile(employe.organizationLogo.fileId);
    }

    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });

    employe.organizationLogo = {
      fileId,
      url,
    };

    await employe.save();

    res.status(200).json({
      success: true,
      message: "Profile updated!",
    });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//--------------------------------Intenship---------------------------------------

exports.createinternship = catchAsyncError(async (req, res, next) => {
  const employe = await Employe.findById(req.id);

  if (!employe) {
    return next(new ErrorHandler('Employe not found', 404));
  }

  const internship = await Internship.create(req.body);
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();

  res.status(201).json({ success: true, internship });
});

// exports.readjob = catchAsyncError(async (req, res, next) => {
//   const employe = await Employe.findById(req.id).populate({
//     path: 'jobs',
//     model: Job // Use the Job model to populate jobs
//   });

//   if (!employe) {
//     return next(new ErrorHandler('Employe not found', 404));
//   }

//   res.status(200).json({ success: true, jobs: employe.jobs });
// });

exports.readinternship = catchAsyncError(async (req, res, next) => {
  const employe = await Employe.findById(req.id).populate({
    path: "internships",
    model: Internship
  });

  if (!employe) {
    return next(new ErrorHandler('Employee not found', 404));
  }
   console.log(employe)
  res.status(200).json({ success: true, internships: employe.internships });
});




exports.readsingleinternship = catchAsyncError(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) {
    return next(new ErrorHandler('Internship not found', 404));
  }

  res.status(200).json({ success: true, internship });
});

exports.createjob = catchAsyncError(async (req, res, next) => {
  const employe = await Employe.findById(req.id);

  if (!employe) {
    return next(new ErrorHandler('Employe not found', 404));
  }

  const job = await Job.create(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();

  res.status(201).json({ success: true, job });
});

exports.readjob = catchAsyncError(async (req, res, next) => {
  const employe = await Employe.findById(req.id).populate({
    path: 'jobs',
    model: Job // Use the Job model to populate jobs
  });

  if (!employe) {
    return next(new ErrorHandler('Employe not found', 404));
  }

  res.status(200).json({ success: true, jobs: employe.jobs });
});

exports.readsinglejob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }
  res.status(200).json({ success: true, job });
});

exports.updateJob = catchAsyncError(async (req, res, next) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, job });
});

exports.deleteJob = catchAsyncError(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  res.status(200).json({ success: true, message: 'Job deleted successfully' });
});



exports.updateInternshipPost = catchAsyncError(async (req, res, next) => {
  let internship = await Internship.findById(req.params.id);

  if (!internship) {
    return next(new ErrorHandler('Internship not found', 404));
  }

  internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, internship });
});

exports.deleteInternshipPost = catchAsyncError(async (req, res, next) => {
  const internship = await Internship.findByIdAndDelete(req.params.id);

  if (!internship) {
    return next(new ErrorHandler('internship not found', 404));
  }

  res.status(200).json({ success: true, message: 'internship deleted successfully' });
});


// Controller function to handle employe's request to view job applicants
exports.getJobApplicants = async (jobId) => {
  try {
    // Find the job by ID and populate the 'students' field to get the details of applicants
    const job = await Job.findById(jobId).populate('students');

    if (!job) {
      throw new Error('Job not found');
    }

    // Extract the applicants' details
    const applicants = job.students.map(student => ({
      id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      contact: student.contact,
      // // Check if resume exists before accessing its URL
      // Add more fields as needed
    }));

    return applicants;
  } catch (error) {
    console.error('Error fetching job applicants:', error);
    throw error;
  }
};


exports.getInternshipApplicants = async (req, res) => {
  try {
    // Get the job ID from the request parameters
    const internshipId = req.params.internshipId;
    // Find the job by ID and populate the 'students' field to get the details of applicants
    const internship = await Internship.findById(internshipId).populate('students');
    // console.log(internship.students.firstname)
    // Extract the applicants' details
    const applicants = internship.students.map(student => ({
      id: student._id,
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      contact: student.contact,
    }));
    // Send the list of applicants as a response
    res.json(applicants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Controller function to fetch student details by ID
exports.getStudentById = async (req, res) => {
  try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId);
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      // Send the student details in the response
      res.json(student);
  } catch (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// Controller function to add a student as shortlisted for a job
exports.addShortlistedStudentJob = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if the student is already shortlisted
    if (job.shortlistedStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Student is already shortlisted for this job' });
    }
    
    // Add the student to the shortlisted students array
    job.shortlistedStudents.push(studentId);
    await job.save();
    
    res.status(200).json({ message: 'Student added as shortlisted for the job' });
  } catch (error) {
    console.error('Error adding student as shortlisted:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




// Controller function to add a student as shortlisted for a job
exports.addShortlistedStudentInternship = async (req, res) => {
  try {
    const { internshipId, studentId } = req.params;
    const internship = await Internship.findById(internshipId);
    
    if (!internship) {
      return res.status(404).json({ message: 'internship not found' });
    }
    
    // Check if the student is already shortlisted
    if (internship.shortlistedStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Student is already shortlisted for this internship' });
    }
    
    // Add the student to the shortlisted students array
    internship.shortlistedStudents.push(studentId);
    await internship.save();
    
    res.status(200).json({ message: 'Student added as shortlisted for the internship' });
  } catch (error) {
    console.error('Error adding student as shortlisted:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
