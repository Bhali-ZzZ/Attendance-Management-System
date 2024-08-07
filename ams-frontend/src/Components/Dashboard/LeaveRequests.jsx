import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import './LeaveRequests.css'; 

const LeaveRequests = () => {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { url, token } = useContext(AuthContext); // Get token from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('No token found. Please login.');
      return;
    }

    setIsSubmitting(true); // Show loading state

    try {
      const response = await axios.post(`${url}/api/users/leave-request`, { reason, startDate, endDate }, {
        headers: {
          'Authorization': `Bearer ${token}` // Use token from context
        }
      });

      if (response.status === 400) {
        toast.error('Leave request already submitted for today.');
      } else {
        toast.success('Leave request submitted successfully!');
        setReason('');
        setStartDate('');
        setEndDate('');
      }
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message); // Log detailed error
      toast.error(`Failed to submit leave request: ${err.response ? err.response.data.message : err.message}`);
    } finally {
      setIsSubmitting(false); // Hide loading state
    }
  };

  return (
    <div className="leave-requests-container">
      <h2>Submit Leave Request</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for leave"
          required
          className="input-field"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
          required
          className="input-field"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
          required
          className="input-field"
        />
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </form>
    </div>
  );
};

export default LeaveRequests;
