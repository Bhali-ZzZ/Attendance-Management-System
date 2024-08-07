import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/attendance">Mark Attendance</Link></li>
        <li><Link to="/leave-requests">Mark Leave</Link></li>
        <li><Link to="/view-attendance">View Attendance</Link></li>
        <li><Link to="/edit-profile">Edit Profile</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
