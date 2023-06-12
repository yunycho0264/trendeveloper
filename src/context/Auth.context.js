import React, { createContext, useState } from "react";

// Create a new context object
export const AuthContext = createContext();

// Create a provider component for the context
export const AuthContextProvider = ({ children }) => {
  // Define state variables for signed in and submitted status
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to check if user is signed in
  const changeSignedIn = () => {
    if (localStorage.getItem("token")) setIsSignedIn(true);
    else setIsSignedIn(false);
  };

  // Function to toggle submitted status
  const changeSubmitted = () => setIsSubmitted(!isSubmitted);

  // Return the provider component with the context value and child components
  return (
    <AuthContext.Provider
      value={{
        isSubmitted,
        isSignedIn,
        changeSignedIn,
        changeSubmitted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
