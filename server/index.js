const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key on backend only
);

// ✅ Confirm Review Endpoint
app.post('/api/confirm-review', (req, res) => {
  console.log('Review confirmed:', req.body);
  res.json({ status: 'success' });
});

// ✅ Patient Case Form Submission
app.post('/api/case', async (req, res) => {
  const { name, contact, description, date } = req.body;
  const { data, error } = await supabase
    .from('patient_cases')
    .insert([{ name, contact, description, date }]);

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true, data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
