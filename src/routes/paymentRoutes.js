import express from 'express';
import { createPayments } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-payment', createPayments);

export default router;
