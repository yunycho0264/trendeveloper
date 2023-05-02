<<<<<<< HEAD
import React from "react";
import styles from "../css/DetailPage.module.css";
import Detailbox from "../components/Detailbox";
import TrendBackground from "../components/TrendBackground";
import CompanyInfo from "../components/CompanyInfo";

const Trend = () => {
  return (
    <div className={styles.require}>
      {/* 배경 박스 */}
      <TrendBackground />
=======
const Trend = () => {
  // App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.

  return (
    <div>
      <div>
        <h2>Trend 페이지</h2>
      </div>
>>>>>>> job/master
    </div>
  );
};

export default Trend;
