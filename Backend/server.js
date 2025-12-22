require("dotenv").config();
const express = require ("express")
const cors = require("cors")
const connectDB = require("./config/db")
const authRouter = require("./routes/auth.route")
const adminRouter = require("./routes/admin.route")
const studentRouter = require("./routes/student.route")

const app= express()

app.use(
  cors({
    origin: [process.env.REACT_PORT,process.env.NORMAL_PORT],
    credentials: true,
  })
);

app.use(express.json())
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/admin",adminRouter)
app.use("/api/student",studentRouter)

app.listen(process.env.PORT, ()=>{
    console.log("Server Running on port 3000")
})