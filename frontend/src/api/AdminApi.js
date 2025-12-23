import API from "./axios"

export async function addStudent ({name,email,course,password,enrollmentDate}){
    try{
        const res = await API.post("/admin/student", {name,email,password,course,enrollmentDate});
        return res.data;
    }catch(error){
        console.log("Error while Adding Student",error)
    }
}

export async function getAllStudents(){
    try{
        const res = await API.get("/admin/student");
        console.log(res.data.students[0].user.name)
        console.log(res.data.students[0].user._id)
        return res.data;
    }catch(error){
        console.log("Error while fetching Student",error)
    }
}

export async function updateStudent(id,{name,email,course,enrollmentDate}){
    try{
        console.log(id)
         const res = await API.patch(`/admin/student/${id}`, {name,email,course,enrollmentDate});
         console.log(res.data.user._id)
        return res.data;
    }catch(error){
        console.log("Error while Updating Student",error)
    }
}

export async function deleteStudent(id){
    console.log('Attempting to delete student with ID:', id); // Add this line
    try{
        const res = await API.delete(`/admin/student/${id}`);
        return res.data;
    }catch(error){
        console.log("Error while Deleting Student",error)
    }
}