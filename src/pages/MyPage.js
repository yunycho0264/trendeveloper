import React from "react";
import styles from "../css/DetailPage.module.css";
import MyPageBackground from "../components/MyPageBackground";

const MyPage = () => {
  return (
    <div>
      <div className={styles.require}>
        {/* Background box */} {/* Comment for the following code block */}
        <MyPageBackground />
      </div>
    </div>
  );
};

export default MyPage;
