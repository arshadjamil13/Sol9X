const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user.model")
const {Student} = require("../models/student.model")
 
 async function signup(req,res){
    try{
  
    const body = req.body
    if(!body){
      return res.status(400).json({message : "Please Give the required Input"})
    }

    const { name, email, password,role } = body ;

    const ExistingUser =  await User.findOne({
        email: email
    })
    if(ExistingUser){
        return res.json({
            message:"Account Already Exists"
        })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      hashed_password: hashedPassword,
      role: role || "student"
    });

    if (user.role === "student") {
      await Student.create({
        user: user._id,
        course: body.course || "",
        enrollmentDate: new Date(),
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email ,role : user.role}, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token:"Bearer " + token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


 async function signin(req,res){
    try{
    const body = req.body
    if(!body){
      return res.status(400).json({message : "Please Give the required Input"})
    }
    
    const {email,password} = body

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email ,role : user.role}, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: "Bearer " + token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

    }catch(error){
    res.status(500).json({ success: false, message: error.message });
}
}

module.exports = { signup ,signin}