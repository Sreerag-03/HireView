const express = require('express');
const db = require('../db/index');
const protect = require('../middleware/auth');

const router = express.Router();

// GET /api/questions/random?role=frontend&topic=react&difficulty=easy
router.get('/random', protect, async (req, res) => {
  const { role, topic, difficulty } = req.query;

  try {
    let query = 'SELECT * FROM questions WHERE 1=1';
    const params = [];

    if (role) {
      params.push(role);
      query += ` AND role = $${params.length}`;
    }

    if (topic) {
      params.push(topic);
      query += ` AND topic = $${params.length}`;
    }

    if (difficulty) {
      params.push(difficulty);
      query += ` AND difficulty = $${params.length}`;
    }

    query += ' ORDER BY RANDOM() LIMIT 1';

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No questions found for the selected filters' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;