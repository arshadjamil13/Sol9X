const express = require("express");
const { updateProfile ,getProfile} = require("../controllers/student.controller");
const { isStudent } = require("../middleware/isStudent.middleware");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/profile",authMiddleware,isStudent,getProfile)
router.patch("/updateprofile",authMiddleware,isStudent,updateProfile)



module.exports = router