import React, { useState, useContext } from "react";

import { AuthContext } from "../context/Auth.context.js";

import { useNavigate } from "react-router-dom";
import "../css/App.css";
import "../css/Common.css";
import "../css/Sign.css";

const API_URI = process.env.REACT_APP_API_URI;

// Function to send a POST request to the server to sign in the user
async function signinUser(credentials) {
  return fetch(API_URI + "/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data);
}

const Signin = () => {
  // Get the changeSignedIn function from the AuthContext
  const { changeSignedIn } = useContext(AuthContext);

  // Set the initial state of email and password to empty strings
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to navigate to the signup page
  const navigateToSignup = () => {
    navigate("/signup");
  };

  // Function to handle changes in the email input field
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle changes in the password input field
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Function to sign in the user
  const setSignin = async (email, password) => {
    // Send a POST request to the server to sign in the user
    const response = await signinUser({
      email,
      password,
    });
    // If the response status is 403, show an alert message
    if (response.status === 403) {
      window.alert("아이디 및 비밀번호를 다시 확인해 주세요!");
    }
    // If the response status is 200, get the token and user information from the response
    else if (response.status === 200) {
      const responseJSON = await response.json();
      // If the token is in the response, save the token and user information to local storage and change the signed in state
      if ("token" in responseJSON) {
        const receivedToken = responseJSON["token"];
        localStorage.setItem("token", receivedToken);
        const receivedName = responseJSON["name"];
        localStorage.setItem("name", receivedName);
        const receivedEmail = responseJSON["email"];
        localStorage.setItem("email", receivedEmail);
        changeSignedIn();
        navigate("/");
      }
    }
  };

  // Function to handle the click event of the sign in button
  const onClickSignin = async (e) => {
    e.preventDefault();
    setSignin(email, password);
  };

  // Render the sign in form
  return (
    <div className="sign">
      <div className="signin-form">
        <form onSubmit={onClickSignin}>
          <div>
            <input
              className="box signinInfo email"
              id="email"
              placeholder="이메일"
              type="email"
              onChange={handleEmail}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              id="pw"
              className="box signinInfo pw"
              onChange={handlePassword}
            />
          </div>
          <div>
            <button
              type="submit"
              className="box signF-bt"
              onClick={onClickSignin}
            >
              로그인
            </button>
          </div>
          <div className="signin-sub">
            <span className="saveId">
              아이디 저장
              <input type="checkbox" />
            </span>
            <a href="https://www.naver.com/"> 아이디 찾기</a> |
            <a href="https://www.naver.com/"> 비밀번호 찾기</a>
          </div>
          <div>
            <button
              className="box signS-bt"
              type="button"
              onClick={navigateToSignup}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
