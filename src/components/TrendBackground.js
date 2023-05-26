import React, { useState, useEffect, useMemo, useContext } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";

import { Link, useLocation, useNavigate } from "react-router-dom";
import TrendReport from "./TrendReport";
import HowRank from "./Modal";
import { ComContext } from "../context/Com.context";

const API_URI = process.env.REACT_APP_API_URI;

const TrendBackground = () => {
  const { jobKor, transName } = useContext(ComContext);

  const [topList, setTopList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const ranks = ["front", "back", "full", "ios", "vr"];

    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    const tmpList = ranks.map((key, index) => {
      const tmp = transName(key, jobKor);
      const rankClass = `rank${index + 1}`;

      return (
        <li key={key}>
          <span>
            {index + 1}
            {". "}
            <Link to={`?id=${key}`} className={`${styles.anker}`}>
              <span>{tmp}</span>
            </Link>
          </span>
        </li>
      );
    });
    setTopList(tmpList);

    if (urlSearchParams.has("id")) {
      console.log(id);
      // console.log(window.location.href);
    } else navigate(`/trend/stat?id=${ranks[0]}`);
  }, [jobKor, navigate]);

  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className="title s-title ">
            TREN<span>D</span>EVELOPER
          </span>
          에 선정한 요즘 뜨는 TOP 5 직군이에요!
          <span className={`${styles.next} `}>
            <HowRank />
          </span>
        </div>
        <div className={`${styles.box} ${styles.rank} ${styles.text}`}>
          <ol className={styles.list}>{topList}</ol>
        </div>
      </div>

      <TrendReport jobKor={jobKor} transName={transName} />
    </div>
  );
};

export default TrendBackground;
