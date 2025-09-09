const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Resume, StudentModel } = require('./models/Student'); // Ensure models are defined with password field

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const JWT_SECRET = 'your-secret-key'; // Replace with a secure secret

mongoose.connect("mongodb://127.0.0.1:27017/Student")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Register endpoint with bcrypt hashing
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, location, bio, profilePicture } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ status: "Failed", error: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const student = await StudentModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      bio,
      profilePicture: profilePicture || "/api/placeholder/150/150"
    });

    const token = jwt.sign({ email: student.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      status: "Success",
      user: {
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        location: student.location || "",
        bio: student.bio || "",
        profilePicture: student.profilePicture
      },
      token
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ status: "Failed", error: err.message });
  }
});

// Login endpoint with bcrypt comparison
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ status: "Failed", error: "Email and password are required" });
    }

    const student = await StudentModel.findOne({ email });
    
    if (!student) {
      return res.status(404).json({ status: "Failed", error: "Student not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password); // Compare hashed password
    if (!isMatch) {
      return res.status(401).json({ status: "Failed", error: "Password incorrect" });
    }

    const token = jwt.sign({ email: student.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      status: "Success",
      user: {
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        location: student.location || "",
        bio: student.bio || "",
        profilePicture: student.profilePicture || "/api/placeholder/150/150"
      },
      token
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "Failed", error: "Server error during login" });
  }
});

// Update profile endpoint (unchanged, but added for completeness)
app.post("/update-profile", async (req, res) => {
  try {
    const { email, ...updateData } = req.body;

    if (!email) {
      return res.status(400).json({ status: "Failed", error: "Email is required" });
    }

    const student = await StudentModel.findOneAndUpdate({ email }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ status: "Failed", error: "User not found" });
    }

    res.json({
      status: "Success",
      user: {
        name: student.name,
        email: student.email,
        phone: student.phone || "",
        location: student.location || "",
        bio: student.bio || "",
        profilePicture: student.profilePicture || "/api/placeholder/150/150",
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ status: "Failed", error: err.message });
  }
});

// Other endpoints (unchanged)
app.post("/api/resumes/create", async (req, res) => {
  try {
    const student = await Resume.create(req.body);
    console.log("created resume");
    res.status(201).json(student);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ status: "Failed", error: err.message });
  }
});

app.get('/personal-info/:email', async (req, res) => {
  try {
    const info = await PersonalInfo.findOne({ email: req.params.email });
    if (!info) {
      return res.status(404).json({ status: "Failed", error: "Not found" });
    }
    res.json({ status: "Success", data: info });
  } catch (err) {
    res.status(500).json({ status: "Failed", error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
