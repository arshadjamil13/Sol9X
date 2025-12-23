import React from "react";

export default function StudentFormModal  ({ isOpen, onClose, onSubmit, initialData, title ,isEdit,password,setPassword})  {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-3"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={initialData.name}
            onChange={(e) => initialData.setName(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={initialData.email}
            onChange={(e) => initialData.setEmail(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Course"
            value={initialData.course}
            onChange={(e) => initialData.setCourse(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="date"
            value={initialData.enrollmentDate}
            onChange={(e) => initialData.setEnrollmentDate(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {!isEdit && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              
            />
          )}
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              {title.includes("Edit") ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};