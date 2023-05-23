import React from "react";
import styles from "../css/DetailMenu.module.css";
import { Link } from "react-router-dom";

const DetailMenu = (props) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  console.log(urlSearchParams.get("id"));
  let recruitmentID = urlSearchParams.get("id");
  return (
    <div className={styles["detail-menu"]}>
      {/*상세 요건*/}
      <div className={styles.requirement}>
        <Link
          to={`/recruitement/DetailPage?id=${recruitmentID}`}
          className={styles.nav}
          id="nav1"
        >
          상세 요건
        </Link>
      </div>
      {/*기업 트렌드*/}
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
