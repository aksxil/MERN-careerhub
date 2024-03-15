const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// const educationSchema = new mongoose.Schema({
//   college: {
//     type: String,
//     required: [true, "College name is required"],
//   },
//   startYear: {
//     type: Number,
//     required: [true, "Start year is required"],
//   },
//   endYear: {
//     type: Number,
//     required: [true, "End year is required"],
//   },
//   degree: {
//     type: String,
//     required: [true, "Degree name is required"],
//   },
//   stream: {
//     type: String,
//     required: [true, "Stream name is required"],
//   },
//   percentage: {
//     type: Number,
//     required: [true, "Percentage is required"],
//   },
// });

const studentModel = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First Name is required"],
    minLength: [4, "First name should be at least 4 characters long"],
  },
  lastname: {
    type: String,
    required: [true, "Last Name is required"],
    minLength: [4, "First name should be at least 4 characters long"],
  },
  contact: {
    type: String,
    required: [true, "Contact Name is required"],
    minLength: [4, "Contact  should be at least 4 characters long"],
    maxLength: [10, "Contact must not exceed 10 characters"],
  },
  city: {
    type: String,
    required: [true, "City Name is required"],
    minLength: [3, "City  should be at least 43 characters long"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    maxLength: [15, "Password should not exceed more than 15 characters"],
    minLength: [6, "Password should have at least 6 characters"],
  },
  resetPasswordToken: {
    type: String,
    default: "0",
  },
  avatar: {
    type: Object,
    default: {
      fileId: "",
      url: "https://plus.unsplash.com/premium_photo-1675080431459-92373a9efd84?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  internships: [
    { type: mongoose.Schema.Types.ObjectId, ref: "internship" }
  ],
  jobs: [
    { type: mongoose.Schema.Types.ObjectId, ref: "job" }
  ],
  savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'job' }],
  savedInternships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'internship' }],
  resume: {
    education: [], // Embedded education schema
    jobs: [],
    internships: [],
    responsibilities: [],
    courses: [],
    projects: [],
    skills: [],
    accomplishments: [],
    portfolio: {
        blogLink: String,
        githubProfile: String,
        playStoreDevAccount: String,
        behancePortfolio: String,
        otherWorkSample: String
    }
}

}, { timestamps: true });

studentModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    let salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

studentModel.methods.comparepassword = function(password) {
  console.log(password,this.password)
  return bcrypt.compareSync(password, this.password);
}

studentModel.methods.getjwttoken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

const Student = mongoose.model("student", studentModel);

module.exports = Student;
