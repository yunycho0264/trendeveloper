import React, { useState, useContext } from "react";

import { AuthContext } from "../context/Auth.context.js";
import { useNavigate } from "react-router-dom";

import "../css/App.css";
import "../css/Common.css";
import "../css/Sign.css";

const API_URI = process.env.REACT_APP_API_URI;

//회원가입
//Signup function that sends a POST request to the server to register a new user
async function signupUser(credentials) {
  return fetch(API_URI + "/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Signup = () => {
  const navigate = useNavigate();

  const { changeSignedIn } = useContext(AuthContext);

  //Function to navigate to the signin page
  const navigateToSignin = () => {
    navigate("/signin");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Functions to handle changes in the input fields
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  //Function to set the signup data and send the request to the server
  const setSignup = async (name, email, password) => {
    const response = await signupUser({
      name,
      email,
      password,
    });
    if ("token" in response) {
      const receivedToken = response["token"];
      const receivedName = response["name"];
      const receivedEmail = response["email"];

      //If the email is already registered, show an alert message
      if (receivedToken === "EXISTS") {
        window.alert("already registered email");
      } else {
        //If the registration is successful, save the user data in the local storage
        localStorage.setItem("token", receivedToken);
        localStorage.setItem("name", receivedName);
        localStorage.setItem("email", receivedEmail);
      }
      //Change the signed in status and navigate to the home page
      changeSignedIn();
      navigate("/");
    }
  };

  // signup 버튼 클릭 이벤트
  const onClickSignup = async (e) => {
    e.preventDefault();
    setSignup(name, email, password);
  };

  // This is a React component that renders a sign up form with terms and conditions.
  // It takes in several props and functions to handle user input and form submission.

  return (
    <div className="sign">
      <div className="containar">
        {/* Title for terms and conditions */}
        <div className="big_title">이용약관 동의</div>
        {/* Subtitle for terms and conditions */}
        <div className="small_title">
          아래 사항을 모두 읽고 약관에 동의해주세요.
        </div>
      </div>
      <div className="container">
        {/* Title for privacy policy */}
        <div className="info_title">개인정보 약관</div>
        <div className="info_box">
          <div className="info_content">
            {/* Content for privacy policy */}
            <p>개인 정보 약관 관련 사항</p>
          </div>
        </div>
        {/* Title for terms of use */}
        <div className="info_title">이용사항</div>
        <div className="info_box">
          {/* Content for terms of use */}
          <div className="info_content">
            <p>위 웹사이트의 이용 사항</p>
          </div>
        </div>
      </div>
      <div className="info_agree">
        <label>
          {/*  Checkbox for agreeing to terms and conditions */}
          <input type="checkbox" onClick={() => {}} id="agree"></input>
          {/*  Label for checkbox */}
          <label>
            &nbsp;위 개인 약관 및 안내사항을 확인하였고 개인정보 수집에
            동의합니다.
          </label>
        </label>
      </div>
      <div className="signup-form">
        {/*  Form for sign up */}
        <form onSubmit={onClickSignup}>
          <div>
            <input
              className="box Info name"
              id="text"
              placeholder="이름"
              type="text"
              onChange={handleName} // Function to handle name input
            />
          </div>
          <div>
            <input
              className="box Info email"
              id="email"
              placeholder="이메일"
              type="email"
              onChange={handleEmail} // Function to handle email input
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              id="pw"
              className="box Info pw"
              onChange={handlePassword} // Function to handle password input
            />
          </div>
          <div>
            <button
              className="box signF-bt"
              type="button"
              onClick={onClickSignup} // Function to handle sign up button click
            >
              회원가입
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="box signS-bt"
              onClick={navigateToSignin} // Function to handle login button click
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
