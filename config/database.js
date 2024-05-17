import mysql from 'mysql';

let pool;

export function connectDatabase() {
  pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      setTimeout(connectDatabase, 2000); // Intentar reconectar después de 2 segundos
    } else {
      console.log('Connected to the MySQL database.');
      connection.release();
    }
  });

  pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Intentar reconectar si la conexión se perdió
      connectDatabase();
    } else {
      throw err;
    }
  });
}

export function getPool() {
  return pool;
}