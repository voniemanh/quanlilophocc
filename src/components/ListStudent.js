import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ListStudent() {
  const [students, setStudents] = useState([]); 
  const loadStudents = ()=>{
    axios.get('http://localhost:9999/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the students!", error);
      });
  }
  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete =(id)=> {
    axios.delete(`http://localhost:9999/students/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the student!", error);
      });
  }
  return(
    <>
      <h1>List of Students</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>GPA</th>
            <th>Grades</th>
            <th></th>
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
                <ul>
                  {student.grades.map((g, idx) => (
                    <li key={idx}>
                      <strong>{g.subject}</strong>: {g.score} điểm ({g.teacher})<br />
                      <em>{g.comment}</em> - {new Date(g.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </td>
              <td><button onClick={()=>handleDelete(student.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default ListStudent;