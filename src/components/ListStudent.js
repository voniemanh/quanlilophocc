import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ListStudent.css';
import { Link } from 'react-router-dom';
import { STUDENT_API } from '../config';

function ListStudent() {
  const [students, setStudents] = useState([]);

  const loadStudents = () => {
    axios.get(STUDENT_API)
      .then(response => setStudents(response.data))
      .catch(error => console.error("There was an error fetching the students!", error));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${STUDENT_API}/${id}`)
      .then(() => setStudents(prev => prev.filter(student => student.id !== id)))
      .catch(error => console.error("There was an error deleting the student!", error));
  };

  return (
    <div className="container">
      <h1 className="title">📚 List of Students</h1>
      <button><Link to={"/add-student"}>Add New Student</Link></button>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>GPA</th>
            <th>Grades</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.gpa}</td>
              <td>
                <ul className="grade-list">
                  {student.grades.map((g, idx) => (
                    <li key={idx}>
                      <strong>{g.subject}</strong>: {g.score} điểm {g.teacher && `(${g.teacher})`}<br />
                      <em>{g.comment}</em> - {new Date(g.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="view-btn">
                  <Link to={`/view-student/${student.id}`}>View</Link></button>
                <button className='view-btn'><Link to={`/edit-student/${student.id}`}>Edit</Link></button>
                <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListStudent;