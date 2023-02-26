import mongoose from "mongoose";

// Defining Schema
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  principalName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  contact: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  tc: { type: Boolean, required: false }
})

// Model
const SchoolModel = mongoose.model("school", schoolSchema)

export default SchoolModel