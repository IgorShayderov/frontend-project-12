import { useEffect, useState } from 'react';

import api from '../api';

const useProvideAuth = () => {
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const defaultUsername = 'unknown';
      const user = localStorage.getItem('currentUser') ?? defaultUsername;

      setUser(user);
    }
  }, []);

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
    signUp
    signOut,
  };
};

export default useProvideAuth;
