import mongoose from "mongoose";

// Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  cnic: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true },
  img: { type: String, required: true, trim: true },
  schoolName: { type: String, required: false, trim: true },
  schoolContact: { type: String, required: false, trim: true },
  regType: { type: String, required: false, trim: true },
  salary: { type: String, required: false, trim: true },
  experience: { type: String, required: false, trim: true },
  classEnrolled: { type: String, required: false, trim: true },
  role: { type: String, required: true, trim: true },
  tc: { type: Boolean, required: true }
})

// Model
const UserModel = mongoose.model("user", userSchema)

export default UserModel