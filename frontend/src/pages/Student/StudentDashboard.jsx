import { useState,useContext,useEffect } from "react";
import StudentFormModal from "../Admin/FormModal";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {fetchStudentProfile,updateProfile} from "../../api/StudentApi"



export default function StudentDashboard  ()  {
    const navigate = useNavigate()
    const {user,logout} = useContext(AuthContext)
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");

  const handleEdit = () => {
    if (!student) return;
    setName(student.user.name);
    setEmail(student.user.email);
    setCourse(student.course);
    setEnrollmentDate(student.enrollmentDate.split("T")[0]);
    setModalOpen(true);
  };

  const handleSubmit = async () => {

    const updated = await updateProfile({name,email,course,enrollmentDate})
    setStudent(updated.student)
    setModalOpen(false)
    alert("Profile updated successfully");
  };

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  useEffect(()=>{

    const fetchapi = async()=>{
        try{
            const data = await fetchStudentProfile()
            setName(data.student.user.name)
            setStudent(data.student);
            setEmail(data.student.user.email);
            setCourse(data.student.course);
            setEnrollmentDate(data.student.enrollmentDate.split("T")[0]);
            setLoading(false)
        }catch(error){
            setError("Failed to load profile");
            setLoading(false);
        }
    }

    fetchapi()
  },[])

  if (loading) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      
       <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
         <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Welcome, {student?.user?.name}
        </h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </header>

      <main className="p-6 max-w-4xl mx-auto mt-6">
        {/* Edit Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-xl mb-3">Course Details</h3>
            <p className="text-gray-700">Course Name: <span className="font-medium">{student?.course}</span></p>
            <p className="text-gray-700">Enrollment Date: <span className="font-medium">{new Date(student?.enrollmentDate).toLocaleDateString()}</span></p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-xl mb-3">Contact Info</h3>
            <p className="text-gray-700">Email: <span className="font-medium">{student?.user?.email}</span></p>
            <p className="text-gray-700">Full Name: <span className="font-medium">{student?.user?.name}</span></p>
          </div>
        </div>
      </main>

      
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-transparent">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
            <StudentFormModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onSubmit={handleSubmit}
              initialData={{ name, setName, email, setEmail, course, setCourse, enrollmentDate, setEnrollmentDate }}
              isEdit={true} 
              title="Edit Profile"
            />
          </div>
        </div>
      )}
      
    </div>
  );
};

