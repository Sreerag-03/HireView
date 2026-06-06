const express = require('express');
const db = require('../db/index');
const protect = require('../middleware/auth');

const router = express.Router();

// POST /api/sessions — save a user's answer
router.post('/', protect, async (req, res) => {
  const { question_id, answer_text } = req.body;
  const user_id = req.user.id;

  try {
    // Validate question exists
    const question = await db.query(
      'SELECT * FROM questions WHERE id = $1',
      [question_id]
    );
    if (question.rows.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Save session with no feedback yet
    const result = await db.query(
      `INSERT INTO sessions (user_id, question_id, answer_text)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, question_id, answer_text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sessions/history — get all sessions for logged in user
router.get('/history', protect, async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await db.query(
      `SELECT s.*, q.question_text, q.role, q.topic, q.difficulty
       FROM sessions s
       JOIN questions q ON s.question_id = q.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;