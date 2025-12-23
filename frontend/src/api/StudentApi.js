import API from "./axios";

export  async function fetchStudentProfile(){
    try{
        const res = await API.get("/student/profile");
        return res.data

    }catch(error){
        console.log("Failed to load Profile",error)
    }
}

export  async function updateProfile({name,email,course,enrollmentDate}){
    try{
    const res = await API.patch("/student/updateprofile", {
      name,
      email,
      course,
      enrollmentDate,
    });

    return res.data

    }catch(error){
        console.log("Failed to update Profile",error)
    }
}