import express from 'express';
import { loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', protect, getAdminProfile);
router.post('/logout', protect, logoutAdmin);

export default router;