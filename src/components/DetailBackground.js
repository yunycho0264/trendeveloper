import React from "react";
import styles from "../css/DetailBackground.module.css";

const DetailBackground=()=> {
  return (
    <div className={styles['detail-background']}>
      <div className={styles.box1}>
        {/* 상단 핑크색 바*/}
        <div className={styles["top-bar"]} />
        {/* 내부 박스*/}
        <div className={styles["inner-box"]} />
        {/*번호 매기기*/}
        <div></div>
      </div>
      <div className={styles.box2}>
        {/* 상단 핑크색 바*/}
        <div className={styles["top-bar"]} />
        {/* 내부 박스*/}
        <div className={styles["inner-box"]} />
        {/*번호 매기기*/}
        <div></div>
      </div>
      <div className={styles.box3}>
        {/* 상단 핑크색 바*/}
        <div className={styles["top-bar"]} />
        {/* 내부 박스*/}
        <div className={styles["inner-box"]} />
        {/*번호 매기기*/}
        <div></div>
      </div>
    </div>
  );
};

export default DetailBackground;