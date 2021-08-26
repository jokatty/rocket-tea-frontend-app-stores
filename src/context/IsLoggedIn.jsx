import React, { useState, createContext } from 'react';
import { getCookie } from '../utils/cookie.mjs';

/* ===================================================== PROVIDER CODE */
export const isLoggedInContext = createContext();
const { Provider } = isLoggedInContext;

export function IsLoggedInProvider({ children }) {
  // On Component load check if user is logged in
  let hasLoggedInCookie = false;
  if (getCookie('storeId')) {
    hasLoggedInCookie = true;
  }
  // State management to pass to children
  const [isLoggedIn, setIsLoggedIn] = useState(hasLoggedInCookie);

  return (
    <Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </Provider>
  );
}
