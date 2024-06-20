// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const UserDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const x = localStorage.getItem("token");
        console.log(x)
        const response = await axios.get('http://localhost:5000/current-user', {
          headers: {
            'Authorization': `Bearer ${x}`
          }
        });
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error(error.response.data.error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div id='container'>
      <h2>Dashboard</h2>
      {currentUser && (
        <div>
          <p>Welcome, {currentUser.username}!</p>
          <p>Email: {currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
