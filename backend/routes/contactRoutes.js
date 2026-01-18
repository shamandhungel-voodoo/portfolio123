import express from 'express';
import {
  sendContactMessage,
  getContactMessages,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', sendContactMessage);
router.get('/', protect, getContactMessages);

export default router;
