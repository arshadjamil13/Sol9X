import { useState,useContext,useEffect } from "react";
import StudentFormModal from "./FormModal";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllStudents,addStudent,updateStudent,deleteStudent} from "../../api/AdminApi";


export default function AdminDashboard  () {
    const navigate = useNavigate()
    const {user,logout} = useContext(AuthContext)
    const [password, setPassword] = useState("");
  const [students, setStudents] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");

  const openAddModal = () => {
    setEditingStudent(null);
    setName(""); setEmail(""); setCourse(""); setEnrollmentDate("");
    setModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent({ studentId: student._id,
                        userId: student.user._id,});
    setName(student.user.name);
    setEmail(student.user.email);
    setCourse(student.course);
    setEnrollmentDate(student.enrollmentDate.split("T")[0]);
    setModalOpen(true);
  };

  const handleSubmit = async() => {
   try{
        if (editingStudent) {
      // UPDATE
      const data = await updateStudent(editingStudent.userId, {
        name,
        email,
        course,
        enrollmentDate :new Date(enrollmentDate).toISOString(),
      });

    //   setStudents((prev) =>
    //     prev.map((s) =>
    //       s._id === editingStudent._id ? data.student : s
    //     )
    //   );
      setStudents((prev) =>
        prev.map((s) => (s.user._id === editingStudent.userId ? data.student : s))
      );

      alert("Student updated successfully");
    } else {
      // ADD
      const data = await addStudent({
        name,
        email,
        password,
        course,
        enrollmentDate :new Date(enrollmentDate).toISOString(),
      });

      setStudents((prev) => [...prev, data.student]);
      alert("Student added successfully");
    }

    setModalOpen(false);
   }catch(error){
        console.error(err);
   }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
     try {
       await deleteStudent(id);
       setStudents((prev) => prev.filter((s) => s.user._id !== id));
       alert("Student deleted successfully");
     } catch (err) {
       console.error(err);
       alert("Failed to delete student");
     }
  };

  const handleLogout = () => {
    logout()
    navigate("/signin")
  }

  useEffect(()=>{
    const fetchStudents = async()=>{
        try{
            const data = await getAllStudents()
            setStudents(data.students)
        }catch(error){
            console.error(err)
        }
    }
    fetchStudents()
  },[])

  if (!user) {
  return <div className="text-center mt-20">Loading user...</div>;
}

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
         <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Welcome, {user?.name}
        </h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Students List</h2>
          <button
            onClick={openAddModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Student
          </button>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map(student => (
            <div key={student.user._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{student.user.name}</h3>
              <p>Email: {student.user.email}</p>
              <p>Course: {student.course}</p>
              <p>Enrollment:{new Date(student.enrollmentDate).toLocaleDateString()}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEditModal(student)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(student.user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      <StudentFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={{ name, setName, email, setEmail, course, setCourse, enrollmentDate, setEnrollmentDate }}
        isEdit={!!editingStudent} 
        title={editingStudent ? "Edit Student" : "Add Student"}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};


