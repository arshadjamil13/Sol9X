const express = require("express");
const { updateStudent,getstudents,addstudent, deleteStudent} = require("../controllers/admin.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/isAdmin.middleware");
const router = express.Router();

router.post("/student",authMiddleware,isAdmin,addstudent)
router.get("/student",authMiddleware,isAdmin,getstudents)
router.patch("/student/:id",authMiddleware,isAdmin,updateStudent)
router.delete("/student/:id",authMiddleware,isAdmin,deleteStudent)

module.exports = router