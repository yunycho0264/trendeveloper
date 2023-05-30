import React, { useState, useEffect, useContext } from "react";
import styles from "../css/MyPage.module.css";
// import "../css/Navbar.css";
import { ComContext } from "../context/Com.context";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { BsFillGearFill } from "react-icons/bs";

const API_URI = process.env.REACT_APP_API_URI;

const MyPageBackground = () => {
  // const urlSearchParams = new URLSearchParams(window.location.search);

  const name = localStorage.getItem("name");

  let [jobInterest, setjobInterest] = useState(null);

  useEffect(() => {
    const MyPageData = async () => {
      const token = localStorage.getItem("token");
      
      const response = await fetch(API_URI + "/api/v1/user/mypage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(),
      });

      const respJSON = await response.json();
      console.log(respJSON);
    };
    
    MyPageData();
  },[]);

  return (
    <div className={styles.whole}>
      <div className={styles.contents1}>
        <div className={styles.label1}>
          <span>{name}</span>님의 관심직무
        </div>
        <div className={styles.box1}></div>
      </div>
      <div className={styles.contents2}>
        <div className={styles.label2}>추천하는 직무</div>
        <div className={styles.box2}>
          {/* {roadmapRank && roadmapRank.length >= 5 && (
            <>
              <div className={styles.rank1}>1. {jobsName[0]}</div>
              <div className={styles.rank2}>2. {jobsName[1]}</div>
              <div className={styles.rank3}>3. {jobsName[2]}</div>
            </>
          )} */}
        </div>
      </div>
      <div className={styles.contents3}>
        <div className={styles.label3}>
          <span>{name}</span>님께서 관심 가질 만한 정보
        </div>
        <div className={styles.box3}></div>
      </div>
    </div>
  );
};

export default MyPageBackground;
