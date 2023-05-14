import React from "react";
import styles from "../css/DetailPage.module.css";
import MyPageBackground from "../components/MyPageBackground";

const MyPage = () => {
  return (
    <div>
      <div className={styles.require}>
        {/* 배경 박스 */}
        <MyPageBackground />
      </div>
    </div>
  );
};

export default MyPage;
