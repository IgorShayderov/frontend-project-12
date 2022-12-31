import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === null) {
      navigate('/login');
    }
  }, [location]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
      </div>
    </>
  );
};

export default Root;
