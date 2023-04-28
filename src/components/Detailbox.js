import React from "react";
import styles from "../css/Detailbox.module.css";

const Detailbox=()=> {
  return(
    <div className={styles['detail-box']}>
      {/* 상단 핑크색 바*/}
      <div className={styles['top-bar']}/>
       {/* 내부 박스*/}
      <div className={styles['inner-box']}/>
    </div>
  );
};

export default Detailbox;