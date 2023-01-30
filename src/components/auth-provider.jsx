import React, { createContext, useContext } from 'react';

import useProvideAuth from '../hooks/useAuth.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;
