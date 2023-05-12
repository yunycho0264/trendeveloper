import React, { useState, useEffect } from "react";
import styles from "../css/DetailTrendBack.module.css";
import { ResponsivePie } from "@nivo/pie";

//API 연결
const API_URI = process.env.REACT_APP_API_URI;

const DetailTrendBack = () => {

  let [companyInfo, setCompanyInfo] = useState(null);

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
      // console.log(respJSON2);
      setCompanyInfo(respJSON2);
    };

    fetchCompanyInfo();
  }, []);

  // const PositiveValue = companyInfo.positive*100;
  // const NegativeValue = companyInfo.negative*100;

  // if (companyInfo && companyInfo.positive) {
  //   console.log(companyInfo.positive);
  // } else {
  //   console.log("Positive value not available");
  // }

  // if (companyInfo && companyInfo.negative) {
  //   console.log(companyInfo.negative);
  // } else {
  //   console.log("Negative value not available");
  // }

//parseInt(NegativeValue)
//parseInt(PositiveValue)

  const data = [
    {
      id: "negative",
      label: "부정",
      value: 40,
      color: "hsl(55, 70%, 50%)",
    },
    {
      id: "positive",
      label: "긍정",
      value: 60,
      color: "hsl(10, 70%, 50%)",
    },
  ];

  return (
    <div>
      <div className={styles.companyLabel}>
        기업 <span className={styles.companyName}>{companyInfo ? companyInfo.companyName : "Loading..."}</span> 의 감성 현황
      </div>
      <div className={styles.background} />
      <div className={styles.chart}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div>1. </div>
    </div>
  );
};

export default DetailTrendBack;
