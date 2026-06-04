const pool = require('./index');

const questions = [
  // Frontend
  { role: 'frontend', topic: 'react', difficulty: 'easy', question_text: 'What is the difference between state and props in React?' },
  { role: 'frontend', topic: 'react', difficulty: 'medium', question_text: 'Explain the useEffect hook and when you would use it.' },
  { role: 'frontend', topic: 'javascript', difficulty: 'easy', question_text: 'What is the difference between var, let, and const?' },
  { role: 'frontend', topic: 'javascript', difficulty: 'medium', question_text: 'Explain event delegation and how it works in the DOM.' },
  { role: 'frontend', topic: 'css', difficulty: 'easy', question_text: 'What is the difference between flexbox and CSS grid?' },

  // Backend
  { role: 'backend', topic: 'node', difficulty: 'easy', question_text: 'What is the event loop in Node.js and how does it work?' },
  { role: 'backend', topic: 'node', difficulty: 'medium', question_text: 'What is middleware in Express and how does it work?' },
  { role: 'backend', topic: 'api', difficulty: 'easy', question_text: 'What is the difference between PUT and PATCH in REST APIs?' },
  { role: 'backend', topic: 'api', difficulty: 'medium', question_text: 'How would you handle authentication in a REST API?' },
  { role: 'backend', topic: 'database', difficulty: 'medium', question_text: 'What is the difference between SQL and NoSQL databases?' },

  // DSA
  { role: 'dsa', topic: 'arrays', difficulty: 'easy', question_text: 'How would you find the maximum element in an array without using built-in methods?' },
  { role: 'dsa', topic: 'arrays', difficulty: 'medium', question_text: 'Given an array of integers, find two numbers that add up to a target sum.' },
  { role: 'dsa', topic: 'strings', difficulty: 'easy', question_text: 'How would you check if a string is a palindrome?' },
  { role: 'dsa', topic: 'strings', difficulty: 'medium', question_text: 'Find the longest substring without repeating characters.' },
  { role: 'dsa', topic: 'linkedlist', difficulty: 'medium', question_text: 'How would you detect a cycle in a linked list?' },

  // HR / Behavioral
  { role: 'hr', topic: 'behavioral', difficulty: 'easy', question_text: 'Tell me about yourself and your journey into software engineering.' },
  { role: 'hr', topic: 'behavioral', difficulty: 'easy', question_text: 'What is your biggest strength and how has it helped you as a developer?' },
  { role: 'hr', topic: 'behavioral', difficulty: 'medium', question_text: 'Describe a challenge you faced in a project and how you overcame it.' },
  { role: 'hr', topic: 'situational', difficulty: 'medium', question_text: 'Where do you see yourself in 3 years and how does this role fit into that plan?' },
  { role: 'hr', topic: 'situational', difficulty: 'easy', question_text: 'Why do you want to work in software engineering?' },
];

const seed = async () => {
  try {
    for (const q of questions) {
      await pool.query(
        `INSERT INTO questions (role, topic, difficulty, question_text)
         VALUES ($1, $2, $3, $4)`,
        [q.role, q.topic, q.difficulty, q.question_text]
      );
    }
    console.log('✓ 20 questions seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();