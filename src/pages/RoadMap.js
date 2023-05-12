import React, { useState, useContext } from "react";

import { AuthContext } from "../context/Auth.context.js";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from "../css/DetailPage.module.css";
import RoadMapBackground from "../components/RoadMapBackground.js";
import UploadFile from "../components/UploadFile.js";

const RoadMap = () => {
  const { isSignedIn, isSubmitted } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isSignedIn) {
  //     alert("로그인 후 이용 가능합니다.");
  //     navigate("/signin");
  //   }
  // }, [isSignedIn]);

  return (
    <div>
      <div>
        <div className={styles.require}>
          {/* 배경 박스 */}
          {isSubmitted === false ? <UploadFile /> : <RoadMapBackground />}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
