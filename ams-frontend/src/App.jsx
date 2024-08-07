import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import Navbar from './Components/Common/Navbar';
import Footer from './Components/Common/Footer';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Attendance from './Components/Dashboard/Attendance';
import LeaveRequests from './Components/Dashboard/LeaveRequests';
import ViewAttendance from './Components/Dashboard/ViewAttendance';
import EditProfile from './Components/Dashboard/EditProfile';
import Sidebar from './Components/Common/Sidebar';
import './styles/global.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/forms.css';
import './styles/about.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="dashboard-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leave-requests" element={<LeaveRequests />} />
              <Route path="/view-attendance" element={<ViewAttendance />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
        <ToastContainer /> {/* Add ToastContainer here */}
      </div>
    </Router>
  );
};

export default App;
