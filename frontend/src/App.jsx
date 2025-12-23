import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Signin from './pages/Auth/Signin';
import Signup from "./pages/Auth/Signup"
import StudentDashboard from "./pages/Student/StudentDashboard"
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
