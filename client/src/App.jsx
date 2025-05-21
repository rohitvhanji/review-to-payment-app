import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientHome from './PatientHome';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientHome />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
