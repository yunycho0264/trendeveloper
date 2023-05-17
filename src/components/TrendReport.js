import React, { useState, useEffect, useMemo } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";

const API_URI = process.env.REACT_APP_API_URI;

const TrendReport = (props) => {
  const [monthKeys, setMonthKeys] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  let [statJSON, setStatJSON] = useState({});
  const [jobName, setJobName] = useState("");

  let [apexChart, setApexChart] = useState(null);

  useEffect(() => {
    console.log(window.location.href);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");
    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        let resp = await fetch(API_URI + "/api/v1/stat?id=" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });

        let respJSON = await resp.json();
        const data = JSON.parse(respJSON.stat);
        setStatJSON(data);
        const tmpKeys = Object.keys(data).sort();
        setMonthKeys(tmpKeys);

        const tmpValues = await Promise.all(
          tmpKeys.map(async (key) => {
            return data[key];
          })
        );
        setMonthValues(tmpValues);
        let ac = new ApexChart([tmpKeys, tmpValues]);
        setApexChart(ac.render());
      }
    };
    fetchData();
    const tmpName = props.transName(id, props.jobKor);
    setJobName(tmpName);
  }, [props]);

  return (
    <div div className={`${styles.background} ${styles.box}`}>
      <div className={styles.contents}>
        <div className={`${styles.text} ${styles["inner-text"]} `}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            {jobName}
          </span>{" "}
          의 과거 6개월 간 채용 동향이에요!
        </div>
        <div className={`${styles.box} ${styles["inner-box"]}`}>
          {apexChart}
        </div>
      </div>

      <div className={styles.contents}>
        <div className={`${styles.text} ${styles["inner-text"]} `}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            {jobName}
          </span>{" "}
          와 관련된 다른 공고도 확인해볼까요?
        </div>
        <div className={`${styles.box} ${styles["inner-box"]}`}>
          <SimpleSlider />
        </div>
      </div>
    </div>
  );
};

export default TrendReport;
