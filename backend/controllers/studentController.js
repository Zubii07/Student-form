const { Op } = require("sequelize");
const Student = require("../models/Student");

exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    // res.status(400).json({ error: error.message });
    if (error.name === "SequelizeValidationError") {
      // Extract validation messages
      const errors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      // Send error response
      return res.status(400).json({ errors });
    }
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    console.log("Students fetched:", students);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  console.log("Request Body:", req.body); // Debug request body

  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (req.body.email) {
      const emailExists = await Student.findOne({
        where: { email: req.body.email, id: { [Op.ne]: req.params.id } },
      });

      if (emailExists) {
        // console.log("Triggering 'Email already exists' error");
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    await student.update(req.body);
    res.status(200).json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    await student.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
