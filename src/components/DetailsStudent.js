import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


function DetailsStudent(){
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9999/students/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the student data!", error);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Details of Student</h1>
      <p>ID: {student.id}</p>
      <p>Name: {student.name}</p>
      <p>Class: {student.class}</p>
      <p>GPA: {student.gpa}</p>
      <button><Link to="/students">Back To ListStudent</Link></button>
    </div>
  );
}
export default DetailsStudent;