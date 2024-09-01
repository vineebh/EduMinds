const express = require('express');
const app = express();
const pool = require('./db.js');  // Import the database connection
const PORT = process.env.PORT || 5500;

// Middleware to parse JSON
app.use(express.json());

// Route to get user by ID (GET)
app.get('/userdata/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await pool.query('SELECT * FROM userdata WHERE id = ?', [id]);
    if (rows.length > 0) {
      return res.status(200).json(rows[0]);
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to create a new user (POST)
app.post('/userdata', async (req, res) => {
  const { id, username, userid, courseid, level } = req.body;

  if (!id || !username || !userid || !courseid || !level) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO userdata (id, username, userid, courseid, level) VALUES (?, ?, ?, ?, ?)',
      [id, username, userid, courseid, level]
    );

    res.status(201).json({ message: 'User created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update a user by ID (PUT)
app.put('/userdata/:id', async (req, res) => {
  const id = req.params.id;
  const { username, userid, courseid, level } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE userdata SET username = ?, userid = ?, courseid = ?, level = ? WHERE id = ?',
      [username, userid, courseid, level, id]
    );

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'User updated successfully' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete a user by ID (DELETE)
app.delete('/userdata/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await pool.query('DELETE FROM userdata WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
