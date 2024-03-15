const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const employeModel = new mongoose.Schema({
  firstname:{
    type:String,
    required:[true,"First Name is required"],
    minLength:[4, "First name should be atleast 4 character long"]
  },
  lastname:{
    type:String,
    required:[true,"Last Name is required"],
    minLength:[4, "First name should be atleast 4 character long"]
  },
  contact:{
    type:String,
    required:[true,"Contact Name is required"],
    minLength:[4, "Contact  should be atleast 4 character long"],
    maxLength:[10, "Contact must not exceed 10 character "]
  },
  email:{
    type:String,
    required:[true,"Email is required"],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique:true
  },
  password:{
    type:String,
    select:false,
    maxLength:[15,"Password should not exceed more than 15 characters"],
    minLength:[6,"Password should have atleast 6 characters"]
  },
  resetPasswordToken: {
    type:String,
    default:"0"
  },
  organizationLogo:{
    type:Object,
    default:{
      fileId:"",
      url:"https://plus.unsplash.com/premium_photo-1675080431459-92373a9efd84?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  },
  organizationname:{
    type:String,
    required:[true,"organizationname Name is required"],
    minLength:[4, "organizationname name should be atleast 4 character long"]
  },
  internships:[
    {type: mongoose.Schema.Types.ObjectId, ref:"internship"}
  ],
  jobs:[ {type: mongoose.Schema.Types.ObjectId, ref:"job"}],
},{timestamps:true})

employeModel.pre("save", function(){
   
  if(!this.isModified("password")){
    return;
  }

  let salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

employeModel.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}


employeModel.methods.getjwttoken = function(){
  return jwt.sign({id: this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
}

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;