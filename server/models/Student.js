const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  location: String,
  bio: String,
  profilePicture: String
});// server/models/resume.model.js



const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  year: String,
  gpa: String,
});

const ExperienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  duration: String,
  description: String,
});

const ProjectSchema = new mongoose.Schema({
  name: String,
  techStack: String,
  description: String,
  sourceCode: String,
});

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  summary: String,
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: String,
  projects: [ProjectSchema],
});
const Resume = mongoose.model("Resume", ResumeSchema);
const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = {
  Resume,
  StudentModel,
};

