const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Confirm Review
app.post('/api/confirm-review', (req, res) => {
  console.log('Review confirmed:', req.body);
  res.json({ status: 'success' });
});

// Add patient case
app.post('/api/case', async (req, res) => {
  const { name, contact, description, date } = req.body;
  const { data, error } = await supabase
    .from('patient_cases')
    .insert([{ name, contact, description, date }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

// Admin login
app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Get all cases
app.get('/api/cases', async (req, res) => {
  const { data, error } = await supabase.from('patient_cases').select('*').order('date', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
