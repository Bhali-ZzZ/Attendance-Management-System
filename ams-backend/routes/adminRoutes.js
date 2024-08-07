import express from 'express';
import { getAllUsers, manageAttendance, approveLeaveRequest } from '../controllers/adminController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.get('/attendance', authMiddleware, adminMiddleware, manageAttendance);
router.put('/leave/:id', authMiddleware, adminMiddleware, approveLeaveRequest);

export default router;
