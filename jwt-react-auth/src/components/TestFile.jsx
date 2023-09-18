import React, { useEffect, useState } from 'react';
import api from '../axios/api';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
const TestFile = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('user/getUser/');
        setUser(response.data[0]);
      } catch (error) {
        // Handle error or redirect to login
        if (error.customError === 'TokenExpired') {
            // Redirect to the login page
            nav('/login');
          }
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.course}</p>
      {/* Render other user details */}
    </div>
  );
};

export default TestFile;