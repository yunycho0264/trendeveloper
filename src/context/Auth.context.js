import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const API_URI = process.env.REACT_APP_API_URI;

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const changeSignedIn = () => {
    if (localStorage.getItem("token")) setIsSignedIn(true);
    else setIsSignedIn(false);

    console.log(isSignedIn);
  };
  const changeSubmitted = () => setIsSubmitted(!isSubmitted);

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
