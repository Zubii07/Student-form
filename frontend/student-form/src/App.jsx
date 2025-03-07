import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentForm from "./components/StudentForm";
import StudentsList from "./components/StudentsList";
import "./style.css";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Student Management</h1>
        <nav>
          <Link to="/form">
            <button className="nav-button">Add Student</button>
          </Link>
          <Link to="/students">
            <button className="nav-button">Show Students</button>
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="/form" element={<StudentForm />} />
        <Route path="/students" element={<StudentsList />} />
      </Routes>
    </Router>
  );
};

export default App;
