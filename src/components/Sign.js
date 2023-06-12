import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/Auth.context.js";

import styles from "../css/Sign.module.css";

const API_URI = process.env.REACT_APP_API_URI;

// 로그아웃
async function signoutUser() {
  const savedToken = `Bearer ${localStorage.getItem("token")}`;

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

  const [signState, setSignState] = useState(null);
  const { changeSignedIn } = useContext(AuthContext);

  useEffect(() => {
    // Get token from local storage
    const tmp = localStorage.getItem("token");
    // Function to sign out user
    const setSignout = async () => {
      // Call signoutUser function to send request to server
      const response = await signoutUser();
      // Remove token, name, and email from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      if (response.ok) {
        // If signout is successful, change signed in status to false
        console.log("로그아웃에 성공했습니다.");
        changeSignedIn();
      } else {
        // If signout fails, change signed in status to false and navigate to home page
        console.log("로그아웃에 실패했습니다.");
        changeSignedIn();
        navigate("/");
      }
    };

    // Function to render menu based on signed in status
    const menu = () => {
      return (
        <ul className={styles.group}>
          {tmp ? (
            // If user is signed in, show My Page and Logout links
            <>
              <li className={styles.userTag}>
                <Link to="/mypage" className={styles.nav}>
                  마이페이지
                </Link>
              </li>
              <li className={styles.userTag}>
                <Link to="/" className={styles.nav} onClick={setSignout}>
                  로그아웃
                </Link>
              </li>
            </>
          ) : (
            // If user is not signed in, show Sign Up and Login links
            <>
              <li className={styles.userTag}>
                <Link to="/signup" className={styles.nav}>
                  회원가입
                </Link>
              </li>
              <li className={styles.userTag}>
                <Link to="/signin" className={styles.nav}>
                  로그인
                </Link>
              </li>
            </>
          )}
        </ul>
      );
    };
    // Set menu to signState
    setSignState(menu);
  }, [changeSignedIn]);

  return <>{signState}</>;
};

export default Sign;
