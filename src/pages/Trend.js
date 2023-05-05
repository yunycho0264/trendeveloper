import React from "react";
import styles from "../css/DetailPage.module.css";

import TrendBackground from "../components/TrendBackground";
import CompanyInfo from "../components/CompanyInfo";

const Trend = () => {
  return (
    <div className={styles.require}>
      {/* 배경 박스 */}
      <TrendBackground />
    </div>
  );
};

export default Trend;
