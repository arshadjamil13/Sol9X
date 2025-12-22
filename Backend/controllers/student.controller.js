const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} =require("../models/user.model")
const {Student} = require("../models/student.model")

 async function getProfile(req,res){
    try{
        const userId = req.user.id; 

    const student = await Student.findOne({ user: userId })
      .populate("user", "name email role");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    return res.status(200).json({
      success: true,
      student
    });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

 async function updateProfile(req,res){
    try{
    const userId = req.user.id;
    const { name, email, course, enrollmentDate } = req.body;

    // Step 1: Update user fields
    if (name || email) {
      await User.findByIdAndUpdate(
        userId,
        {
          ...(name && { name }),
          ...(email && { email })
        },
        { new: true }
      );
    }

    // Step 2: Update student fields
    if (course || enrollmentDate) {
      await Student.findOneAndUpdate(
        { user: userId },
        {
          ...(course && { course }),
          ...(enrollmentDate && { enrollmentDate: new Date(enrollmentDate) })
        },
        { new: true }
      );
    }

    const updatedProfile = await Student.findOne({ user: userId })
      .populate("user", "name email role");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student: updatedProfile
    });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {getProfile,updateProfile}
