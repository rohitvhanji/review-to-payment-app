import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simple check to redirect to login if not authenticated
  // (You can improve this with real auth later)
  useEffect(() => {
    // For now, no persistent login, so do nothing.
    // You may add real auth here.
  }, []);

  useEffect(() => {
    async function fetchCases() {
      try {
        const res = await axios.get('/api/cases');
        setCases(res.data.data);
      } catch (err) {
        alert("Failed to fetch cases, redirecting to login.");
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    }
    fetchCases();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: 800, margin: "auto" }}>
      <h1>Submitted Patient Cases</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cases.length === 0 ? (
        <p>No cases submitted yet.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.contact}</td>
                <td>{c.description}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
