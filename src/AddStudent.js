import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddStudent() {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [gpa, setGpa] = useState('');
  const [gradesText, setGradesText] = useState('');

  const navigate = useNavigate(); 

  const handleAddStudent = () => {
    const gradesArray = gradesText.split(',').map(item => {
      const [subject, score] = item.trim().split(':');
      return { subject: subject.trim(), score: parseFloat(score) };
    });

    const newStudent = {
      name,
      class: className,
      gpa: parseFloat(gpa),
      grades: gradesArray,
    };

    axios.post('http://localhost:9999/students', newStudent)
      .then(() => {
        alert("Student added successfully!");
        navigate('/students'); 
      })
      .catch(error => {
        console.error("There was an error adding the student!", error);
      });
  };

  return (
    <div>
      <h1>Add Student</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Class"
        value={className}
        onChange={e => setClassName(e.target.value)}
      /><br />
      <input
        type="number"
        placeholder="GPA"
        value={gpa}
        onChange={e => setGpa(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Grades (e.g. Toán:9, Văn:8)"
        value={gradesText}
        onChange={e => setGradesText(e.target.value)}
      /><br />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
}

export default AddStudent;
