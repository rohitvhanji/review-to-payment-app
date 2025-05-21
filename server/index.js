const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

// ✅ Allow frontend origin only
app.use(cors({
  origin: 'https://review-to-payment-app.vercel.app'
}));

app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ Confirm Review Endpoint
app.post('/api/confirm-review', (req, res) => {
  console.log('Review confirmed:', req.body);
  res.json({ status: 'success' });
});

// ✅ Patient Case Submission Endpoint
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

// ✅ Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
