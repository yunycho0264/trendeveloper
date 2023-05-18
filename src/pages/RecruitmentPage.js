import React from "react";
import styles from "../css/DetailPage.module.css";

import TrendBackground from "../components/TrendBackground";
import CompanyInfo from "../components/CompanyInfo";
import RecruitBackground from "../components/RecruitmentBackground";

const Recruitment = () => {
  return (
    <div className={styles.require}>
      {/* 배경 박스 */}
      <RecruitBackground />
    </div>
  );
};

export default Recruitment;
