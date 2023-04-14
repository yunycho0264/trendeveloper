import React, { useState } from "react";
import "../css/App.css";
import { useNavigate } from "react-router-dom";

import swal from "sweetalert";

async function loginUser(credentials) {
  return fetch("http://202.182.126.161:3000/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Signup = () => {
  const navigate = useNavigate();

  const navigateToSignin = () => {
    navigate("/signin");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickSignup = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      name,
      email,
      password,
    });
    if ("token" in response) {
      localStorage.setItem("token", response["token"]);
      localStorage.setItem("user", JSON.stringify(response["user"]));
      navigate("/mypage");
    } else {
      console.log(response.message);
    }
  };

  return (
    <div className="signup">
      <div className="containar">
        <div className="big_title">이용약관 동의</div>
        <div className="small_title">
          아래 사항을 모두 읽고 약관에 동의해주세요.
        </div>
      </div>
      <div className="container">
        <div className="info_title">개인정보 약관</div>
        <div className="info_box">
          <div className="info_content">
            <p>개인 정보 약관 관련 사항</p>
          </div>
        </div>

        <div className="info_title">이용사항</div>
        <div className="info_box">
          <div className="info_content">
            <p>위 웹사이트의 이용 사항</p>
          </div>
        </div>
      </div>
      <div className="info_agree">
        <label>
          <input type="checkbox" onClick={() => {}} id="agree"></input>
          <label>
            &nbsp;위 개인 약관 및 안내사항을 확인하였고 개인정보 수집에
            동의합니다.
          </label>
        </label>
      </div>
      <div className="signup-form">
        <form onSubmit={onClickSignup}>
          <div>
            <input
              className="box Info name"
              id="text"
              placeholder="이름"
              type="text"
              onChange={handleName}
            />
          </div>
          <div>
            <input
              className="box Info email"
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
              className="box Info pw"
              onChange={handlePassword}
            />
          </div>
          <div>
            <button
              className="box signin-bt"
              type="button"
              onClick={onClickSignup}
            >
              회원가입
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="box signup-bt"
              onClick={navigateToSignin}
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
