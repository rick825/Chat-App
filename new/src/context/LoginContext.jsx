import React, { createContext, useContext, useState, useEffect } from 'react';


const LoginContext =  createContext();


export const LoginProvider = ({ children }) => {
  
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')) || null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  useEffect(() => {
    console.log("Local Storage Logged In User-->", loggedInUser);
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser])

  useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn, loggedInUser, setLoggedInUser }}>
      {children}
    </LoginContext.Provider>
  );
};

  

export const useLoginStatus = () => useContext(LoginContext);