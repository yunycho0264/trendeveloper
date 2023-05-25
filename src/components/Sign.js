import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/Auth.context.js";

const API_URI = process.env.REACT_APP_API_URI;

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

const Sign = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const [signState, setSignState] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { isSignedIn, changeSignedIn } = useContext(AuthContext);

  useEffect(() => {
    // const tmp = localStorage.getItem("token");
    // console.log(token);
    console.log(localStorage.getItem("token"));
    const tmp = localStorage.getItem("token");
    const setSignout = async () => {
      const response = await signoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      console.log(response.status);
      if (response.ok) {
        console.log("로그아웃에 성공했습니다.");
        changeSignedIn();
        //   navigate("/");
      } else {
        console.log(response.message);
        console.log(localStorage.getItem("token"));
        console.log("로그아웃에 실패했습니다.");
        changeSignedIn();
        navigate("/");
      }
    };

    const menu = () => {
      return (
        <>
          {tmp ? (
            <>
              <span>{name} 님</span> <Link to="/mypage">마이페이지</Link> |{" "}
              <Link to="/" onClick={setSignout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup">회원가입</Link> |{" "}
              <Link to="/signin">로그인</Link>
            </>
          )}
        </>
      );
    };
    // setToken(tmp);

    // console.log(tmp);
    setToken(tmp);
    console.log(tmp);
    setSignState(menu);
  }, [changeSignedIn]);

  return <>{signState}</>;
};

export default Sign;
