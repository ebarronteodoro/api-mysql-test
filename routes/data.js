import express from 'express';
import { getData, getUser, createUser, updateUser, deleteUser } from '../controllers/dataController.js';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/dataController.js';

const router = express.Router();

router.get('/data', getData);
router.get('/data/:id_user', getUser);
router.post('/data', createUser);
router.put('/data/:id_user', updateUser);
router.delete('/data/:id_user', deleteUser);

// Rutas para productos
router.get('/products', getProducts);
router.get('/products/:id_product', getProduct);
router.post('/products', createProduct);
router.put('/products/:id_product', updateProduct);
router.delete('/products/:id_product', deleteProduct);

export default router;
