import React from "react";
import styles from "../css/DetailMenu.module.css";

const DetailMenu = () => {
  return (
    <div className={styles["detail-menu"]}>
      {/*상세 요건*/}
      <div className={styles.requirement}>
        <a href="aaa">상세 요건</a>
      </div>
      {/*기업 트렌드*/}
      <div className={styles["company-trend"]}>
        <a href="aaa">기업 트렌드</a>
      </div>
    </div>
  );
};

export default DetailMenu;
