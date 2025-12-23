import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/axios";

export default function Signin (){

  const navigate = useNavigate()
  const {login} = useContext(AuthContext)

  const [email,  setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    setLoading(true);
    setError("");
    try{
      const response = await API.post("/auth/signin",{
        email,
        password
      })

      const {user,token} = response.data
      login(user,token)
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    }catch(err){
      setError(err.response?.data?.message || "Login failed");
    }finally{
      setLoading(false)
    }
  };
   if (loading) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition cursor-pointer" 
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

