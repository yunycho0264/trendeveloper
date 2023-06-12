import React from "react";
import styles from "../css/DetailPage.module.css";
import DetailBackground from "../components/DetailBackground";
import CompanyInfo from "../components/CompanyInfo";
import Companylogo from "../components/Companylogo";
import DetailMenu from "../components/DetailMenu";

const DetailPage = () => {
  return (
    <div className={styles.require}>
      {/* 배경 박스 */}
      <DetailBackground />
      {/* 기업로고 박스 */}
      <CompanyInfo className={styles.logo} />
      {/* 기업 로고 이미지 */}
      <Companylogo />
      {/* 왼쪽 상세 채용 공고 메뉴 */}
      <DetailMenu />
      {/* <RecruitmentList /> */}
    </div>
  );
};

export default DetailPage;
