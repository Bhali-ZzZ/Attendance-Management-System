import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import './EditProfile.css'; // Import the CSS file

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    profilePic: ''
  });

  const { url, token } = useContext(AuthContext); // Get token from context

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}` // Use token from context
          }
        });
        setProfile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [url, token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    if (profile.profilePic) {
      formData.append('profilePic', profile.profilePic);
    }

    try {
      await axios.put(`${url}/api/users/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` // Use token from context
        }
      });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <h2>Edit Profile</h2>
      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="file"
        name="profilePic"
        onChange={handleFileChange}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
