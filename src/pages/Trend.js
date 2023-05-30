import React, { useEffect, useState } from "react";
import styles from "../css/DetailPage.module.css";

import TrendBackground from "../components/TrendBackground";
import CompanyInfo from "../components/CompanyInfo";
import { rank } from "d3-array";
const API_URI = process.env.REACT_APP_API_URI;

const Trend = () => {
  const [ranks, setRanks] = useState(null);
  useEffect(() => {
    const fetchRanks = async () => {
      let from = "202004";
      let count = 40;

      const response = await fetch(
        API_URI + `/api/v1/stat/rank?from=${from}&count=${count}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      const respJSON = await response.json();
      console.log(respJSON);
      let tmp = respJSON.map((item) => {
        return item.name;
      });
      tmp = tmp.slice(0, 5);

      setRanks(<TrendBackground ranks={tmp} />);
      console.log(tmp);
    };

    fetchRanks();
  }, []);

  return (
    <div className={styles.require}>
      {/* 배경 박스 */}
      {ranks}
    </div>
  );
};

export default Trend;
