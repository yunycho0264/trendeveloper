import React, { useState, useEffect } from "react";
import styles from "../css/DetailTrendBack.module.css";
// import { ResponsivePie } from "@nivo/pie";
import ReactApexChart from "react-apexcharts";

//API 연결
const API_URI = process.env.REACT_APP_API_URI;


const DetailTrendBack = () => {
  let [companyInfo, setCompanyInfo] = useState(null);
  const [chartData, setChartData] = useState([0, 0]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchCompanyInfo = async () => {
      // const token = localStorage.getItem('token');
      let recruitmentID = urlSearchParams.get("id");

      const response = await fetch(
        API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(),
        }
      );

      const respJSON = await response.json();

      const response2 = await fetch(
        API_URI + "/api/v1/company/detail?id=" + respJSON["companyName"],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(),
        }
      );

      const respJSON2 = await response2.json();
      console.log(respJSON2);
      setCompanyInfo(respJSON2);
      setChartData([respJSON2.negative * 100, respJSON2.positive * 100, respJSON2.neutral * 100]);
    };

    fetchCompanyInfo();
  }, []);

  return (
    <div> 
      <div className={styles.background} />
      <div className={styles.chart}>
        <ReactApexChart
          options={donutData.options}
          series={chartData}
          type="pie"
          width="500"
        />
      </div>
      <div className={styles["headline-label"]}>관련 뉴스 헤드라인을 살펴볼까요?<br/>
      <span>(클릭하면 관련 뉴스 기사 페이지로 이동해요!)</span>
      </div>
    </div>
  );
};

//차트 데이터
const donutData = {
  options: {
    chart: {
      type: "pie",
    },
    colors: ["#FF6666", "#8BC34A", "#D9D9D9"],   
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
      },
    ],
    labels: ["부정", "긍정", "중립"],
    title: {
      text: "기업 감성 현황",
      fontSize: "24px",
      align: "center",
    },
  },
};


export default DetailTrendBack;
