import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get('/api/cases')
      .then(res => setCases(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Submitted Patient Cases</h2>
      {cases.map((c, i) => (
        <div key={i} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <strong>Name:</strong> {c.name}<br />
          <strong>Contact:</strong> {c.contact}<br />
          <strong>Description:</strong> {c.description}<br />
          <strong>Date:</strong> {new Date(c.date).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
