const mongoose = require("mongoose");


const internshipModel = new mongoose.Schema({
  students:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}],
  employe:{type: mongoose.Schema.Types.ObjectId, ref:"employe"},
  profile:String,
  skill:String,
  internshiptype:{
    type:String,
    enum:["In office","Remote"]
  },
  type:{
    type:String,
    default:'internship'
},
  location:String,
  openings:Number,
  from:String,
  to:String,
  duration:String,
  preferences: String,
  responsibility:String,
  stipend:{
    status:{type:String, enum:["Fixed","Negotiable","Perfomance Based","Unpaid"]},
    amount:Number
  },
  perks:String,
  assesments:String,
  shortlistedStudents:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}]

},{timestamps:true})


const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship;