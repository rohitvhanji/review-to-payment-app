const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/confirm-review', (req, res) => {
  console.log('Review confirmed:', req.body);
  res.json({ status: 'success' });
});

app.post('/api/case', async (req, res) => {
  const { name, contact, description, date } = req.body;
  const { data, error } = await supabase
    .from('patient_cases')
    .insert([{ name, contact, description, date }]);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
