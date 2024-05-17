import express from 'express';
import { getData, getUser, createUser, updateUser, deleteUser } from '../controllers/dataController.js';

const router = express.Router();

router.get('/data', getData);
router.get('/data/:id_user', getUser);
router.post('/data', createUser);
router.put('/data/:id_user', updateUser);
router.delete('/data/:id_user', deleteUser);

export default router;
