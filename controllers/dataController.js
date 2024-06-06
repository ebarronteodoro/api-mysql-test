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
  const userId = req.params.id_user;
  const pool = getPool();
  pool.query('SELECT * FROM users WHERE id_user = ?', [userId], (err, results) => {
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
  const { name, last_name, age } = req.body;
  const pool = getPool();
  pool.query('INSERT INTO users (name, last_name, age) VALUES (?, ?, ?)', [name, last_name, age], (err, results) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).json({ id_user: results.insertId, name, last_name, age });
  });
}

export function updateUser(req, res) {
  const userId = req.params.id_user;
  const { name, last_name, age } = req.body;
  const pool = getPool();
  pool.query('UPDATE users SET name = ?, last_name = ?, age = ? WHERE id_user = ?', [name, last_name, age, userId], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json({ id_user: userId, name, last_name, age });
  });
}

export function deleteUser(req, res) {
  const userId = req.params.id_user;
  const pool = getPool();
  pool.query('DELETE FROM users WHERE id_user = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('User deleted successfully');
  });
}

export function getProducts(req, res) {
  const pool = getPool();
  pool.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
}

// Obtener un producto por su ID
export function getProduct(req, res) {
  const productId = req.params.id_product;
  const pool = getPool();
  pool.query('SELECT * FROM products WHERE id_product = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      res.status(500).send('Server error');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Product not found');
      return;
    }
    res.json(results[0]);
  });
}

// Crear un nuevo producto
export function createProduct(req, res) {
  const { nombre, descripcion, precio, cantidad } = req.body;
  const pool = getPool();
  pool.query('INSERT INTO products (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, cantidad], (err, results) => {
    if (err) {
      console.error('Error creating product:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(201).json({ id_product: results.insertId, nombre, descripcion, precio, cantidad });
  });
}

// Actualizar un producto existente
export function updateProduct(req, res) {
  const productId = req.params.id_product;
  const { nombre, descripcion, precio, cantidad } = req.body;
  const pool = getPool();
  pool.query('UPDATE products SET nombre = ?, descripcion = ?, precio = ?, cantidad = ? WHERE id_product = ?', [nombre, descripcion, precio, cantidad, productId], (err, results) => {
    if (err) {
      console.error('Error updating product:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json({ id_product: productId, nombre, descripcion, precio, cantidad });
  });
}

// Eliminar un producto
export function deleteProduct(req, res) {
  const productId = req.params.id_product;
  const pool = getPool();
  pool.query('DELETE FROM products WHERE id_product = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Product deleted successfully');
  });
}