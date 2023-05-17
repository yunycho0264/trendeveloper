import React, { useState, useEffect, useMemo } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";

import { AiFillQuestionCircle } from "react-icons/ai";

import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TrendReport from "./TrendReport";

const API_URI = process.env.REACT_APP_API_URI;

const TrendBackground = () => {
  const jobKor = useMemo(() => {
    return [
      "서버/백엔드 개발자",
      "프론트엔드 개발자",
      "웹 풀스택 개발자",
      "안드로이드 개발자",
      "IOS 개발자",
      "크로스플랫폼 개발자",
      "게임 클라이언트 개발자",
      "게임 서버 개발자",
      "	DBA",
      "빅데이터 엔지니어",
      "인공지능/머신러닝",
      "devops/시스템 엔지니어",
      "정보보안 담당자",
      "QA 엔지니어",
      "개발 PM",
      "HW/임베디드",
      "SW/솔루션",
      "웹퍼블리셔",
      "VR/AR/3D",
      "블록체인",
      "기술지원",
    ];
  }, []);
  const transName = (id, jobKor) => {
    let name = "";

    switch (id) {
      case "back":
        name = jobKor[0];
        break;
      case "front":
        name = jobKor[1];
        break;
      case "full":
        name = jobKor[2];
        break;
      case "android":
        name = jobKor[3];
        break;
      case "ios":
        name = jobKor[4];
        break;
      case "crossp":
        name = jobKor[5];
        break;
      case "gclient":
        name = jobKor[6];
        break;
      case "gserver":
        name = jobKor[7];
        break;
      case "dba":
        name = jobKor[8];
        break;
      case "bigdata":
        name = jobKor[9];
        break;
      case "ai":
        name = jobKor[10];
        break;
      case "devops":
        name = jobKor[11];
        break;
      case "security":
        name = jobKor[12];
        break;
      case "qa":
        name = jobKor[13];
        break;
      case "pm":
        name = jobKor[14];
        break;
      case "embeded":
        name = jobKor[15];
        break;
      case "solution":
        name = jobKor[16];
        break;
      case "wpublisher":
        name = jobKor[17];
        break;
      case "vr":
        name = jobKor[18];
        break;
      case "blockchain":
        name = jobKor[19];
        break;
      case "support":
        name = jobKor[20];
        break;
      default:
        name = "";
        break;
    }

    return name;
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [topList, setTopList] = useState([]);

  const [monthKeys, setMonthKeys] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  let [statJSON, setStatJSON] = useState({});

  let [apexChart, setApexChart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ranks = ["front", "back", "full", "ios", "vr"];

    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    const tmpList = ranks.map((key) => {
      console.log(key);
      const tmp = transName(key, jobKor);
      // const handleParameterChange = () => {
      //   console.log(`Navigating to /trend/stat?id=${key}`);
      //   // navigate(`/trend/stat?id=${key}`);
      // };
      return (
        <div key={key}>
          {/* <li onClick={handleParameterChange}>{tmp}</li> */}
          <li>
            {" "}
            <Link to={`?id=${key}`}>{tmp}</Link>
          </li>
        </div>
      );
    });
    setTopList(tmpList);

    if (urlSearchParams.has("id")) {
      console.log(id);
      console.log(window.location.href);
    } else window.location.href = `?id=${ranks[0]}`;
  }, [jobKor, navigate]);

  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className="title s-title ">
            TREN<span>D</span>EVELOPER
          </span>
          에 선정한 요즘 뜨는 TOP 5 직군이에요!
          <span>
            <AiFillQuestionCircle />
            <Modal isOpen={false}> </Modal>
          </span>
        </div>
        <div className={`${styles.box} ${styles.rank} ${styles.text}`}>
          <ol className="list">{topList}</ol>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={`${styles.next} ${styles.text}`}>
          직군 트렌드 순위는 어떻게 산정할까요?
        </div>
        <div className={`${styles.box} ${styles.how}`}></div>
      </div>
      <TrendReport jobKor={jobKor} transName={transName} />
    </div>
  );
};

export default TrendBackground;
