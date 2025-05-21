import React, { useState } from 'react';

const BACKEND_URL = 'https://review-to-payment-app.onrender.com'; // your deployed backend URL

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', contact: '', description: '', date: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/case`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to submit case');
      setMessage('Case submitted successfully!');
      setForm({ name: '', contact: '', description: '', date: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Patient Case Submission</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label><br />
        <input name="name" value={form.name} onChange={handleChange} required /><br />
        <label>Contact</label><br />
        <input name="contact" value={form.contact} onChange={handleChange} required /><br />
        <label>Description</label><br />
        <textarea name="description" value={form.description} onChange={handleChange} required /><br />
        <label>Date</label><br />
        <input type="date" name="date" value={form.date} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit Case</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
