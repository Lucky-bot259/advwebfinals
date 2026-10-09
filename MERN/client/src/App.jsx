import { useEffect, useState } from "react";
import axios from "axios";
 
function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
 
  const loadStudents = () => {
    axios.get("http://localhost:5000/students").then((response) => {
      setStudents(response.data);
    });
  };
 
  useEffect(() => {
    loadStudents();
  }, []);
 
  const resetForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };
 
  const addStudent = () => {
    axios
      .post("http://localhost:5000/students", { name, course, age })
      .then(() => {
        loadStudents();
        resetForm();
      });
  };
 
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`).then(() => {
      loadStudents();
    });
  };
 
  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };
 
  const updateStudent = () => {
    axios
      .put(`http://localhost:5000/students/${editingId}`, { name, course, age })
      .then(() => {
        loadStudents();
        resetForm();
      });
  };
 
  return (
    <div>
      <h1>Student Management System</h1>
 
      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
 
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
 
      <br />
      <br />
 
      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
 
      <br />
      <br />
 
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
 
      <br />
      <br />
 
      {editingId ? (
        <>
          <button onClick={updateStudent}>Update Student</button>
          <button onClick={resetForm}>Cancel</button>
        </>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}
 
      <h2>Students</h2>
 
      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => startEdit(student)}>Edit</button>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
 
export default App;