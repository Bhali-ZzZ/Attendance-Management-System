import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const url = "http://localhost:4000";

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize from localStorage

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${url}/api/auth/user`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUser(res.data);
        } catch (err) {
          console.log(err);
          localStorage.removeItem('token'); // Only remove token if fetch fails
          setToken(null);
        }
      }
    };
    fetchUser();
  }, [token, url]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, logout, url }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
