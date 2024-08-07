import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 style={{
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
}}>Dashboard</h1>

      <div className="button-container">
        <Link to="/attendance" className="dashboard-button">Mark Attendance</Link>
        <Link to="/leave-requests" className="dashboard-button">Mark Leave</Link>
        <Link to="/view-attendance" className="dashboard-button">View Attendance</Link>
        <Link to="/edit-profile" className="dashboard-button">Edit Profile</Link>
      </div>
    </div>
  );
};

export default Dashboard;
