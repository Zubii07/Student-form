import React, { useState } from "react";
import axios from "axios";
import AlertNotification from "./AlertNotification";

const StudentForm = () => {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
  });

  const [notification, setNotification] = useState();

  //console.log("notification:", notification);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("student:", student);
      await axios.post("http://localhost:5000/api/students", student);
      // alert("Student added successfully!");
      showNotification("Student added successfully!", "success");
      setStudent({ id: "", name: "", email: "", age: "" });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        showNotification(`${validationErrors[0].message}`, "error");
        console.error(validationErrors); // Debugging
        // setErrorMessages(validationErrors); // Save errors for display
      } else {
        alert("An unexpected error occurred.");
      }

      console.error(error);
      console.log("Error adding student");
    }
  };

  const showNotification = (message, type) => {
    console.log("showNotification called");
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <div className="student-form-container">
      {notification && notification.message && (
        <AlertNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="student-form">
        <h2 className="form-heading">Student Registration</h2>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="integer"
            id="id"
            name="id"
            value={student.id}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
