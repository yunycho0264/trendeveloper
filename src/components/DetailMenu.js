import React from "react";
import styles from "../css/DetailMenu.module.css";
import { Link } from "react-router-dom";

const DetailMenu = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  let recruitmentID = urlSearchParams.get("id");
  return (
    <div className={styles["detail-menu"]}>
      {/* Link to recruitment detail page */}
      <div className={styles.requirement}>
        <Link
          to={`/recruitement/detail?id=${recruitmentID}`}
          className={styles.nav}
          id="nav1"
        >
          상세 요건
        </Link>
      </div>
      {/* Link to company detail page */}
      <div className={styles["company-trend"]}>
        <Link
          to={`/company/detail?id=${recruitmentID}`}
          className={styles.nav}
          id="nav1"
        >
          기업 트렌드
        </Link>
      </div>
    </div>
  );
};

export default DetailMenu;
