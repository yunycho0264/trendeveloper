import React, { useState, useEffect, useMemo, useContext } from "react";
import styles from "../css/RoadMap.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexCharts from "./charts";

import { AiFillQuestionCircle } from "react-icons/ai";

import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import MyResponsiveBar from "./columnChart";
import ColumnChart from "./columnChart";

const API_URI = process.env.REACT_APP_API_URI;

const RoadMapBackground = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  let [roadmapRank, setRoadmapRank] = useState(null);
  const [jobsList, setJobsList] = useState([]);

  const [jobsName, setJobsName] = useState([]);
  const [avgData, setAvgData] = useState([]);
  let [columChart, setColumChart] = useState(null);

  const [stateName, setStateName] = useState("");

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

  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  useEffect(() => {
    const fetchRoadmapRank = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URI + "/api/v1/lecture/get?count=" + 5, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(),
      });

      const respJSON = await response.json();
      setRoadmapRank(respJSON);
      console.log(respJSON);
      console.log(Object.values(respJSON[0][0])[0]);

      const tmpList = respJSON.map((item, index) => {
        return Object.keys(item[0])[0];
      });

      console.log(tmpList);
      console.log(id);
      console.log(tmpList[0]);

      if (urlSearchParams.has("id")) {
        console.log(id);
        // console.log(window.location.href);
      } else navigate(`?id=${tmpList[0]}`);

      setJobsList(
        tmpList.map((item) => {
          const tmp = transName(item, jobKor);
          return (
            <div key={item}>
              <Link to={`?id=${item}`}>{tmp}</Link>
            </div>
          );
        })
      );
      const tmpName = tmpList.map((item, index) => {
        return transName(item, jobKor);
      });
      const tmpData = respJSON.map((item, index) => {
        return parseFloat(Object.values(item[0])[0].toFixed(2));
      });
      console.log(tmpData);
      setJobsName(tmpName);
      setAvgData(tmpData);

      let ac = new ColumnChart([tmpName, tmpData]);
      setColumChart(ac.render());
    };

    fetchRoadmapRank();
    setStateName(transName(id, jobKor));
  }, [jobKor, navigate, id]);

  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            파워레인저
          </span>{" "}
          님의 로드맵
          <span>
            <AiFillQuestionCircle />
            <Modal isOpen={false}> </Modal>
          </span>
        </div>
      </div>

      {/* 클릭한 직업 */}
      <div className={styles.background}>
        <div className={styles.label1}>추천 직무</div>
        <div className={styles["inner-box1"]}>
          {roadmapRank && roadmapRank.length >= 5 && (
            <>
              <div className={styles.rank1}>1. {jobsName[0]}</div>
              <div className={styles.rank2}>2. {jobsName[1]}</div>
              <div className={styles.rank3}>3. {jobsName[2]}</div>
            </>
          )}
        </div>
        <div className={styles.label2}>
          <span>파워레인저</span> 님의 상위 직군 역량
        </div>
        <div className={styles["inner-box2"]}>{columChart}</div>

        {jobsList}
        <div className={styles.label3}>
          <span>{stateName}</span> 와 관련 있는 공고에요!
          <div>
            {roadmapRank && roadmapRank.length > 0 && (
              <>
                <div>1. {JSON.stringify(roadmapRank[0], null, 2)}</div>
                <div>2. {JSON.stringify(roadmapRank[1], null, 2)}</div>
                <div>3. {JSON.stringify(roadmapRank[2], null, 2)}</div>
                <div>4. {JSON.stringify(roadmapRank[3], null, 2)}</div>
                <div>5. {JSON.stringify(roadmapRank[4], null, 2)}</div>
              </>
            )}
          </div>
        </div>

        <div className={styles["inner-box3"]} />
      </div>
    </div>
  );
};

export default RoadMapBackground;
