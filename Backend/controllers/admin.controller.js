const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user.model")
const {Student} = require("../models/student.model")

 async function addstudent(req,res){
    try{
    const { name, email, password, course, enrollmentDate } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 1: Create user first
    const newUser = await User.create({
      name,
      email,
      hashed_password: hashedPassword,
      role: "student"
    });

    // Step 2: Create Student linked to User
    const student = await Student.create({
      user: newUser._id,
      course: course || "",
      enrollmentDate: enrollmentDate ? new Date(enrollmentDate) : new Date()
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email
        },
        course: student.course,
        enrollmentDate: student.enrollmentDate
      }
    });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

 async function getstudents(req,res) {
    try{
    const students = await Student.find().populate("user", "name email role"); // fetch limited user fields

    return res.status(200).json({
      success: true,
      total: students.length,
      students
    });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


 async function updateStudent(req,res){
    try{
        const userId = req.params.id;
        const { name, email, course, enrollmentDate } = req.body;

    // Step 1: Update User data if provided
    let updatedUser = null;
    if (name || email) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { 
          ...(name && { name }),
          ...(email && { email })
        },
        { new: true }
      );
    }

    // Step 2: Update Student data if provided
    let updatedStudent = null;
    if (course || enrollmentDate) {
      updatedStudent = await Student.findOneAndUpdate(
        { user: userId },
        { 
          ...(course && { course }),
          ...(enrollmentDate && { enrollmentDate: new Date(enrollmentDate) })
        },
        { new: true }
      ).populate("user", "name email role");
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      user: updatedUser,
      student: updatedStudent
    });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

 async function deleteStudent(req,res){
    try{
        const userId = req.params.id;

    // Step 1: Delete student record
        await Student.findOneAndDelete({ user: userId });

    // Step 2: Delete user account
        await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully"
    });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {addstudent,getstudents,updateStudent,deleteStudent}