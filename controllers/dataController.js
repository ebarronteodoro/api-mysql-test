import { getPool } from '../config/database.js';

export function getData(req, res) {
  const pool = getPool();
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      return;
    }

    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
      connection.release();
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });
}