import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isSignedIn: null,
  name: null,
  email: null,
  password: null,
});

const API_URI = process.env.REACT_APP_API_URI;

//회원가입

async function signupUser(credentials) {
  return fetch(API_URI + "/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

// 로그인
async function signinUser(credentials) {
  return fetch(API_URI + "/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data);
}

// 로그아웃
async function signoutUser() {
  const savedToken = `Bearer ${localStorage.getItem("token")}`;

  console.log(savedToken);

  // return localStorage.removeItem("user");

  return fetch(API_URI + "/api/v1/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: savedToken,
    },
    body: JSON.stringify(),
  }).then((data) => data);
}

export const ContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = useNavigate();

  const changeSignedIn = () => setIsSignedIn(!isSignedIn);

  const setSignup = async (name, email, password) => {
    const response = await signupUser({
      name,
      email,
      password,
    });
    if ("token" in response) {
      var receivedToken = response["token"];
      if (receivedToken === "EXISTS") {
        window.alert("already registered email");
      } else {
        localStorage.setItem("token", receivedToken);
        window.alert("Token: " + receivedToken);
      }
      navigate("/signin");
    }
  };

  const setSignin = async (email, password) => {
    const response = await signinUser({
      email,
      password,
    });
    console.log(response);
    if (response === 403) {
      window.alert("403 Forbidden");
    } else if (response.status === 200) {
      const responseJSON = await response.json();
      if ("token" in responseJSON) {
        const receivedToken = responseJSON["token"];
        localStorage.setItem("token", receivedToken);
        window.alert("Token: " + receivedToken);
        changeSignedIn();
        console.log(isSignedIn);
        navigate("/");
      }
    }
  };

  const setSignout = async () => {
    const response = await signoutUser();
    localStorage.removeItem("user");
    // changeSignedIn();
    // console.log(isSignedIn);
    // navigate("/");
    console.log(response.status);
    if (response.ok) {
      console.log("로그아웃에 성공했습니다.");
      changeSignedIn();
      console.log(isSignedIn);
      navigate("/");
    } else {
      console.log(response.message);
      console.log("로그아웃에 실패했습니다.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setSignin,
        setSignout,
        setSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
