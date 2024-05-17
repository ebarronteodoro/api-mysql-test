import express from 'express';
import { getData, getUser, createUser, updateUser, deleteUser } from '../controllers/dataController.js';

const router = express.Router();

router.get('/data', getData);
router.get('/data/:id', getUser);
router.post('/data', createUser);
router.put('/data/:id', updateUser);
router.delete('/data/:id', deleteUser);

export default router;
