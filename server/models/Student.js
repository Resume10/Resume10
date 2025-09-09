const mongoose = require("mongoose");

// Student Schema (User Profile)
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Prevent duplicate emails
    trim: true,
    lowercase: true, // Normalize emails
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"], // Basic validation
  },
  phone: {
    type: String,
    trim: true,
    default: "", // Empty default to avoid null
  },
  location: {
    type: String,
    trim: true,
    default: "", // Empty default
  },
  bio: {
    type: String,
    trim: true,
    default: "", // Empty default
  },
  profilePicture: {
    type: String,
    trim: true,
    default: "/api/placeholder/150/150", // Matches your backend fallback
  },
}, { timestamps: true }); // Adds createdAt/updatedAt fields

// Resume Sub-Schemas (unchanged, but added trim for consistency)
const EducationSchema = new mongoose.Schema({
  institution: { type: String, trim: true },
  degree: { type: String, trim: true },
  year: { type: String, trim: true },
  gpa: { type: String, trim: true },
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, trim: true },
  position: { type: String, trim: true },
  duration: { type: String, trim: true },
  description: { type: String, trim: true },
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  techStack: { type: String, trim: true },
  description: { type: String, trim: true },
  sourceCode: { type: String, trim: true },
});

// Resume Schema (minor tweaks for consistency)
const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: { type: String, trim: true },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  summary: { type: String, trim: true },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: { type: String, trim: true },
  projects: [ProjectSchema],
}, { timestamps: true });

const Resume = mongoose.model("Resume", ResumeSchema);
const StudentModel = mongoose.model("Student", StudentSchema);

module.exports = {
  Resume,
  StudentModel,
};
