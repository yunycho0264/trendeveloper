import React from "react";
import styles from "../css/DetailPage.module.css";
import DetailBackground from "../components/DetailBackground";
import CompanyInfo from "../components/CompanyInfo";
import Companylogo from "../components/Companylogo";
import DetailMenu from "../components/DetailMenu";
import RecruitmentList from "../components/RecruitmentList";

// //백엔드
// async function detailPage(credentials) {
//   return fetch(API_URI + "/api/v1/recruitment/detail", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

// const API_URI = process.env.REACT_APP_API_URI;

// const url = new URL(window.location.href);
// const params = new URLSearchParams(url.search);
// console.log(params.get("id"));

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
      <RecruitmentList />
    </div>
  );
};

export default DetailPage;
