import User from '../models/User.js';
import Attendance from '../models/Attendance.js';
import LeaveRequest from '../models/LeaveRequest.js';
// import Grade from '../models/Grade.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const manageAttendance = async (req, res) => {
  try {
    const attendances = await Attendance.find();
    res.json(attendances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const approveLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const leaveRequest = await LeaveRequest.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ msg: 'Leave Request not found' });
    }

    leaveRequest.status = 'approved';
    await leaveRequest.save();
    res.json(leaveRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
