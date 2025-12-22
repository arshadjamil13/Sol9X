const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: String },
  enrollmentDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Student  = mongoose.model("Student" , StudentSchema)
module.exports = {Student}
