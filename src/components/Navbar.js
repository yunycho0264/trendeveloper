import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context.js";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const { setSignout } = useContext(AuthContext);

  // signout 버튼 클릭 이벤트
  const onClickSignout = async (e) => {
    e.preventDefault();
    setSignout();
  };

  return (
    <div className="navbar">
      <ul>
        <li className="title">
          <Link to="/">
            <p>
              TREN<span>D</span>EVELOPER
            </p>
          </Link>
        </li>
        <li className="menu">
          <li>
            <Link to="/detail">채용공고</Link>
          </li>
          <li>
            <Link to="/trend">트랜드</Link>
          </li>
          <li>
            <Link to="/roadmap">로드맵</Link>
          </li>
        </li>
        <li className="top_bar">
          {/* {isSignedIn ? (
            <li>
              <Link to="/mypage">마이페이지</Link> |{" "}
              <Link to="/" onClick={onClickSignout}>
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/signup">회원가입</Link> |{" "}
              <Link to="/signin">로그인</Link>
            </li>
          )} */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
