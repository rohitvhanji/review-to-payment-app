// src/PatientForm.jsx
import { useState } from 'react';
import axios from 'axios';

function PatientForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://your-backend-url.onrender.com/api/case", formData);
    onSubmit(); // move to next step
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Patient Case Form</h2>
      <input name="name" required placeholder="Full Name" className="w-full p-2 border" onChange={handleChange} />
      <input name="contact" required placeholder="Contact Number" className="w-full p-2 border" onChange={handleChange} />
      <textarea name="description" required placeholder="Problem Description" className="w-full p-2 border" onChange={handleChange} />
      <input name="date" type="date" required className="w-full p-2 border" onChange={handleChange} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}

export default PatientForm;
