import React from "react";
import CompanyInfo from "../components/CompanyInfo";
import Companylogo from "../components/Companylogo";
import DetailMenu from "../components/DetailMenu";
import DetailTrendBack from "../components/DetailTrendBack";
import RecruitmentList from "../components/RecruitmentList";
import NewsList from "../components/NewsList";

const DetailTrend = () => {
  return (
    <div>
      <NewsList />
      <CompanyInfo />
      <Companylogo />
      <DetailMenu />
      <DetailTrendBack />
    </div>
  );
};

export default DetailTrend;
