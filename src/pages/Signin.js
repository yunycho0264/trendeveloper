import React, { useState, useContext } from "react";

import { AuthContext } from "../context/Auth.context.js";

import { useNavigate } from "react-router-dom";
import "../css/Common.css";
import "../css/App.css";

const Signin = () => {
  const { setSignin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const navigateToSignup = () => {
    navigate("/signup");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // signin 버튼 클릭 이벤트
  const onClickSignin = async (e) => {
    e.preventDefault();
    setSignin(email, password);
  };
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
