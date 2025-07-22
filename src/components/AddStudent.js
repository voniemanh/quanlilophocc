import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { STUDENT_API } from '../config';

function AddStudent() {
  const [form, setForm] = useState({
    name: '',
    className: '',
    gpa: '',
    gradesText: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

const handleAddStudent = () => {
    axios.get(STUDENT_API)
      .then(res => {
        const maxId = Math.max(0, ...res.data.map(s => +s.id || 0));
        const grades = form.gradesText.split(',').map(item => {
          const [subject, score] = item.split(':');
          return { subject: subject?.trim(), score: parseFloat(score) };
        });

        const newStudent = {
          id: (maxId + 1).toString(),
          name: form.name,
          class: form.className,
          gpa: parseFloat(form.gpa),
          grades,
        };

        return axios.post(STUDENT_API, newStudent);
      })
      .then(() => {
        alert('Student added successfully!');
        navigate('/students');
      })
      .catch(err => {
        console.error('Error adding student:', err);
      });
  };

  return (
    <div>
      <h1>Add Student</h1>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
      <input name="className" placeholder="Class" value={form.className} onChange={handleChange} /><br />
      <input name="gpa" type="number" placeholder="GPA" value={form.gpa} onChange={handleChange} /><br />
      <input name="gradesText" placeholder="Grades (e.g. Toán:9, Văn:8)" value={form.gradesText} onChange={handleChange} /><br />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
}

export default AddStudent;
