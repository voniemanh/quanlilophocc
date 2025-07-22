import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { STUDENT_API } from '../config';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`${STUDENT_API}/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the student data!", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${STUDENT_API}/${id}`, student)
      .then(() => {
        alert('Student updated successfully!');
        navigate('/students');
      })
      .catch(error => {
        console.error("There was an error updating the student!", error);
      });
  };

  if (!student) return <div>Loading...</div>;


  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID: </label>
          <span>{student.id}</span>
        </div>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Class: </label>
          <input
            type="text"
            name="class"
            value={student.class}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>GPA: </label>
          <input
            type="number"
            step="0.1"
            name="gpa"
            value={student.gpa}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update</button>
        <Link to="/students"><button type="button">Back To List</button></Link>
      </form>
    </div>
  );
}

export default EditStudent;
