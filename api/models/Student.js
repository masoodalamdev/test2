import mongoose from "mongoose";

// Defining Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  contact: { type: String, required: false, trim: true },
  school: { type: String, required: false, trim: true },
  imgUrl: { type: String, required: false, trim: true },
  tc: { type: Boolean, required: false }
})

// Model
const StudentModel = mongoose.model("student", studentSchema)

export default StudentModel