import User from '../models/User.js';
import LeaveRequest from '../models/LeaveRequest.js';
import Attendance from '../models/Attendance.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import moment from 'moment';

// Update Profile with profile picture upload functionality
export const updateProfile = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Delete the image from local storage
      fs.unlinkSync(req.file.path);

      // Update user profile with Cloudinary URL
      user.profilePic = result.secure_url;
    }

    if (name) user.name = name;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Mark Attendance
export const markAttendance = async (req, res) => {
  const { status } = req.body;

  try {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    // Check if attendance has already been marked for today
    const existingAttendance = await Attendance.findOne({
      userId: req.user.id,
      date: {
        $gte: startOfDay.toDate(),
        $lte: endOfDay.toDate(),
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    const attendance = new Attendance({
      userId: req.user.id,
      status,
      date: new Date()
    });

    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Check Attendance
export const checkAttendance = async (req, res) => {
  try {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    const existingAttendance = await Attendance.findOne({
      userId: req.user.id,
      date: {
        $gte: startOfDay.toDate(),
        $lte: endOfDay.toDate(),
      }
    });

    res.json({ attendanceMarked: !!existingAttendance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Submit Leave Request
export const submitLeaveRequest = async (req, res) => {
  const { reason, startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ msg: 'Start date and end date are required' });
  }

  try {
    // Check if leave request has already been submitted for today
    const existingRequest = await LeaveRequest.findOne({
      userId: req.user.id,
      date: {
        $gte: moment().startOf('day').toDate(),
        $lte: moment().endOf('day').toDate(),
      }
    });

    if (existingRequest) {
      return res.status(400).json({ msg: 'Leave request already submitted for today' });
    }

    const leaveRequest = new LeaveRequest({
      userId: req.user.id,
      reason,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      date: new Date()
    });

    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Attendance
export const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ userId: req.user.id }).sort({ date: -1 });

    if (!attendanceRecords.length) {
      return res.status(404).json({ msg: 'No attendance records found' });
    }

    res.json(attendanceRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
