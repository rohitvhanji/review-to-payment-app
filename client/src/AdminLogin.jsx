import React, { useState } from 'react';

const BACKEND_URL = 'https://review-to-payment-app.onrender.com';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [cases, setCases] = useState(null);

  const handleChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      // fetch all cases after successful login
      const casesRes = await fetch(`${BACKEND_URL}/api/cases`);
      const casesData = await casesRes.json();
      setCases(casesData.data || casesData);
    } catch (err) {
      setError(err.message);
      setCases(null);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label><br />
        <input name="username" value={credentials.username} onChange={handleChange} required /><br />
        <label>Password</label><br />
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required /><br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cases && (
        <>
          <h3>Submitted Cases</h3>
          <ul>
            {cases.map(c => (
              <li key={c.id}>
                <b>{c.name}</b> ({c.contact}) — {new Date(c.date).toLocaleDateString()}<br />
                {c.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
