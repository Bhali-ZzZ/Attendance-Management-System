import React from 'react';
import './About.css'; // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <p className="about-description">
        This is an Attendance Management System designed to simplify and enhance the process of managing and tracking attendance. 
        Our system provides various features tailored to improve attendance management efficiency.
      </p>
      <ul className="features-list">
        <li>• Real-time attendance tracking and reporting</li>
        <li>• Easy leave request and approval system</li>
        <li>• Detailed attendance analytics and summaries</li>
        <li>• Secure and user-friendly interface</li>
        <li>• Integration with college databases for seamless updates</li>
      </ul>
    </div>
  );
};

export default About;
