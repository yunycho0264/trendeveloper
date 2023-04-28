import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

async function signoutUser() {
  return fetch("http://202.182.126.161:3000/api/v1/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  }).then((data) => data.json());
}

const Navbar = () => {
  const [sign, setSign] = useState(true);
  const onClick = () => {
    setSign((prev) => !prev);
  };

  // signout 버튼 클릭 이벤트
  const onClickSignout = async (e) => {
    e.preventDefault();
    const response = await signoutUser();
    if ("token" in response) {
      setSign(false);
    } else {
      console.log(response.message);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <span className="title">
          TREN<span>D</span>EVELOPER
        </span>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">채용공고</Link>
          </li>
          <li>
            <Link to="/">트랜드</Link>
          </li>
          <li>
            <Link to="/">로드맵</Link>
          </li>
        </ul>
      </div>
      <div className="sign">
        <ul>
          <li>
            <Link to="/signup">회원가입</Link>
          </li>
          {sign ? (
            <li>
              <Link to="/signin">로그인</Link>
            </li>
          ) : (
            <li>
              <Link to="/signup">
                <button onClick={onClick}>회원가입</button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
