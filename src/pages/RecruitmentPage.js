import React from "react";
import styles from "../css/DetailPage.module.css";

import TrendBackground from "../components/TrendBackground";
import CompanyInfo from "../components/CompanyInfo";
import RecruitBackground from "../components/RecruitmentBackground";

const Recruitment = () => {
  return (
    <div
      style={{
        width: "70vw",
        marginLeft: "18vw",
        marginBottom: "10vh",
        marginTop: "1vh",
        background: "#fff",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto 100px",
      }}
    >
      {/* 배경 박스 */}
      <RecruitBackground />
    </div>
  );
};

export default Recruitment;
