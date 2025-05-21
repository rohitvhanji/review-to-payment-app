import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PatientForm from './PatientForm';
import AdminLogin from './AdminLogin';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Patient Case Form</Link>
        <Link to="/admin">Admin Login</Link>
      </nav>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<PatientForm />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>
    </div>
  );
}
