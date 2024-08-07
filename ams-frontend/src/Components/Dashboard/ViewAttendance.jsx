import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import './viewAttendance.css'; // Import CSS file

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const { url, token } = useContext(AuthContext); // Get URL and token from context

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${url}/api/users/attendance`, { 
          headers: {
            'Authorization': `Bearer ${token}` // Use token from context
          }
        });
        setAttendance(res.data);
      } catch (err) {
        console.error('Failed to fetch attendance records', err);
      }
    };
    fetchAttendance();
  }, [url, token]);

  return (
    <div className="attendance-container">
      <h1 className="attendance-title">Attendance Records</h1>
      <ul className="attendance-list">
        {attendance.map(record => (
          <li key={record._id} className="attendance-item">
            <span className="attendance-date">Date: {new Date(record.date).toLocaleDateString()}</span>
            <span className="attendance-status">Status: {record.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAttendance;
