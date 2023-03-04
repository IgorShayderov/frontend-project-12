import { useState } from 'react';

import api from '../api';

const useProvideAuth = () => {
  const savedUsername = localStorage.getItem('currentUser');
  const [currentUser, setUser] = useState(savedUsername);

  const getToken = () => {
    const token = localStorage.getItem('token');

    return token;
  };

  const signIn = (login, password) => api.signIn({ login, password })
    .then(({ token, username }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', username);
      setUser(username);
    });

  const signUp = (login, password) => api.signUp({ login, password })
    .then(({ token, username }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', username);
      setUser(username);
    });

  const signOut = () => new Promise((resolve) => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUser(null);
    resolve();
  });

  return {
    currentUser,
    signIn,
    signUp,
    signOut,
    getToken,
    setUser,
  };
};

export default useProvideAuth;
