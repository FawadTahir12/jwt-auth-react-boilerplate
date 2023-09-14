import React, { useEffect, useState } from 'react';
import api from '../axios/api';

const TestFile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('user/getUser/');
        setUser(response.data[0]);
      } catch (error) {
        // Handle error or redirect to login
        console.log(error);
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