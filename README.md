# Sol9X – Student Management System (Admin & Student Dashboard)

This project is a **Full Stack Student Management System** with **role-based authentication** (Admin & Student).  
Admins can manage students (CRUD operations), and students can access their own dashboard.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Context API (Auth Management)
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Role-based Access Control (Admin / Student)

---

## 📂 Project Structure

```
Sol9X/
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 🔐 Authentication Flow

- User logs in / signs up
- JWT token is stored in `localStorage`
- AuthContext manages:
  - `user`
  - `token`
  - `login()`
  - `logout()`
- Role-based routing:
  - **Admin → Admin Dashboard**
  - **Student → Student Dashboard**

---

## 🧑‍💻 Admin Features

- View all students
- Add new students
- Edit student details
- Delete students
- Secure admin-only APIs

### Admin APIs
```
POST   /api/admin/student
GET    /api/admin/student
PATCH  /api/admin/student/:userId
DELETE /api/admin/student/:userId
```

---

## 🎓 Student Features

- View own profile
- Secure student-only access
- JWT-protected routes

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/Sol9X.git
cd Sol9X
```

---

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
npm run dev
```

Create `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables (Frontend)

Create `.env` inside `Frontend`:
```
VITE_API_BASE_URL= https://sol9x-ipaj.onrender.com/api
```


## 🧠 Best Practices Used

- Centralized Axios instance
- Protected Routes
- Clean API layer
- Context-based auth
- Modular folder structure

---

## 📌 Future Improvements

- Pagination
- Search & Filter
- Toast notifications
- Form validation
- Admin analytics dashboard

---

## 👨‍💻 Author

**Arshad Jamil**  
Full Stack Developer (MERN)  

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
