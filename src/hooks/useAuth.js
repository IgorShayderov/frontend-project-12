import { useState } from 'react';
import axios from 'axios';

const useProvideAuth = () => {
  const [currentUser, setUser] = useState(null);

  const signIn = (username, password) => axios.post('login', {
    username,
    password,
  }).then(({ data }) => {
    const { token, username } = data;

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', username);
    setUser(username);
  });

  const signUp = (username, password) => axios.post('signup', {
    username,
    password,
  }).then(({ data }) => {
    const { token, username } = data;

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', username);
    setUser(username);
  });

  const signOut = () => new Promise((resolve) => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.location.reload();
    resolve();
  });

  return {
    currentUser,
    signIn,
    signUp,
    signOut,
  };
};

export default useProvideAuth;
