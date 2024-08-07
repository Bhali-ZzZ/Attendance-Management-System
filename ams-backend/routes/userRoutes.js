import express from 'express';
import { updateProfile, markAttendance, checkAttendance, submitLeaveRequest, getAttendance } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../config/multer.js'; // Import Multer configuration

const router = express.Router();

// Middleware to handle file uploads
router.put('/profile', authMiddleware, upload.single('profilePic'), updateProfile);

// Attendance routes
router.post('/attendance', authMiddleware, markAttendance);
router.get('/attendance/check', authMiddleware, checkAttendance);
router.get('/attendance', authMiddleware, getAttendance); // Add this route for getting all attendance records

// Leave request route
router.post('/leave-request', authMiddleware, submitLeaveRequest);

export default router;
