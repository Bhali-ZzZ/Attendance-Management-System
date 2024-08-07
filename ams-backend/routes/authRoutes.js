import express from 'express';
import { registerUser, loginUser, getAuthUser } from '../controllers/authController.js';
// import auth from '../middlewares/auth.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get Authenticated User
router.get('/user', authMiddleware, getAuthUser);

export default router;
