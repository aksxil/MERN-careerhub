const mongoose = require("mongoose");


const jobModel = new mongoose.Schema({
    students:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}],
    employe: { type: mongoose.Schema.Types.ObjectId, ref: "employe" },
    title: String,
    skills: String,
    type:{
        type:String,
        default:'job'
    },
    jobtype: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    description: String,
    preferences: String,
    salary: Number,
    perks: String,
    location:String,
    responsibility: String,
    stipend: {
        status: { type: String, enum: ["Fixed", "Negotiable", "Perfomance Based", "Unpaid"] },
        amount: Number
    },
    perkes: String,
    assesments: String,
    shortlistedStudents:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}]

}, { timestamps: true })


const job = mongoose.model("job", jobModel);

module.exports = job;