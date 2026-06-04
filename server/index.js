const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/index');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'HireView API running' }));

app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT COUNT(*) FROM questions');
    res.json({ 
      message: 'Database connected successfully',
      question_count: result.rows[0].count 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));