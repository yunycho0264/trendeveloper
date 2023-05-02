import React from "react";
import styles from "../css/DetailPage.module.css";
import Detailbox from "../components/Detailbox";
import DetailBackground from "../components/DetailBackground";
import CompanyInfo from "../components/CompanyInfo";

const DetailPage = () => {
  return (
    <div className={styles.require}>
      {/* 배경 박스 */}
      <DetailBackground />
      {/* 상세요건 박스 */}
      <Detailbox className={styles.box1} />
      {/* 기업로고 박스 */}
      {/* <CompanyInfo /> */}
    </div>
  );
};

export default DetailPage;
