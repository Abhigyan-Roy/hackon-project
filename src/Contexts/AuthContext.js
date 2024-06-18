import React, { createContext, useState } from 'react';
import User from '../../../models/User';
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const value={
    User,
    setUser,
    isLoggedIn,
    setIsLoggedIn
  }
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};