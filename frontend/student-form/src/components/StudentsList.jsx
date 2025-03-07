import React, { useEffect, useState } from "react";
import axios from "axios";
import AlertNotification from "./AlertNotification";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setNotification({ message: "Failed to fetch students.", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setNotification({
        message: "Student deleted successfully!",
        type: "success",
      });
      fetchStudents(); // Update the list after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
      setNotification({ message: "Error deleting student.", type: "error" });
    }
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent({ ...editStudent, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/students/${editStudent.id}`,
        editStudent
      );
      setNotification({
        message: "Student updated successfully!",
        type: "success",
      });
      setEditStudent(null); // Close the edit form
      fetchStudents(); // Update the list
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Extract and display backend error message
        setNotification({
          message: error.response.data.error || "Error updating student.",
          type: "error",
        });
      } else {
        setNotification({
          message: "Unexpected error occurred.",
          type: "error",
        });
      }
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="students-list">
      <h2>Students List</h2>
      {notification.message && (
        <AlertNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id} className="student-item">
              <div>
                <strong>ID:</strong> {student.id}, <strong>Name:</strong>{" "}
                {student.name}, <strong>Email:</strong> {student.email},{" "}
                <strong>Age:</strong> {student.age}
              </div>
              <button
                className="edit-button"
                onClick={() => handleEditClick(student)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {editStudent && (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <h3>Edit Student</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={editStudent.name}
              onChange={handleEditChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={editStudent.email}
              onChange={handleEditChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              name="age"
              value={editStudent.age}
              onChange={handleEditChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="save-button">
            Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditStudent(null)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentsList;
