import express from 'express';
import { crearPreferencia } from '../controllers/checkout.controller.js';

const router = express.Router();

router.post('/create-preference', crearPreferencia);

export default router;