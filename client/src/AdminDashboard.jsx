import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("https://review-to-payment-app.onrender.com/api/cases");
        setCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err);
      }
    };
    fetchCases();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Submitted Patient Cases</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.contact}</td>
              <td>{c.description}</td>
              <td>{new Date(c.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
