import { getPool } from '../config/database.js';

export function getData(req, res) {
  const pool = getPool();
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
}

export function getUser(req, res) {
  const userId = req.params.id;
  const pool = getPool();
  pool.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }
    res.json(results[0]);
  });
}

export function createUser(req, res) {
  const { name, email } = req.body;
  const pool = getPool();
  pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).json({ id: results.insertId, name, email });
  });
}

export function updateUser(req, res) {
  const userId = req.params.id;
  const { name, email } = req.body;
  const pool = getPool();
  pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json({ id: userId, name, email });
  });
}

export function deleteUser(req, res) {
  const userId = req.params.id;
  const pool = getPool();
  pool.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('User deleted successfully');
  });
}