import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import './Attendance.css'; // Import the CSS file

const Attendance = () => {
  const [status, setStatus] = useState('present'); // Default status
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const { url, token } = useContext(AuthContext); // Destructure token from context

  useEffect(() => {
    const checkAttendance = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${url}/api/users/attendance/check`, {
          headers: {
            'Authorization': `Bearer ${token}` // Use token from context
          }
        });
        setAttendanceMarked(response.data.attendanceMarked);
      } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message); // Log detailed error
      }
    };

    checkAttendance();
  }, [token, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('No token found. Please login.');
      return;
    }

    try {
      await axios.post(`${url}/api/users/attendance`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}` // Use token from context
        }
      });
      setAttendanceMarked(true); // Set attendance marked to true after successful marking
      toast.success('Attendance marked successfully!');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); // Log detailed error
      toast.error(`Failed to mark attendance: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  return (
    <div className="attendance-container">
      <form className="attendance-form" onSubmit={handleSubmit}>
        <select
          className="select-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          disabled={attendanceMarked}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        <button 
          type="submit" 
          className={`submit-button ${attendanceMarked ? 'marked' : 'not-marked'}`}
          disabled={attendanceMarked}
        >
          {attendanceMarked ? 'Marked' : 'Mark your Attendance'}
        </button>
      </form>
    </div>
  );
};

export default Attendance;
