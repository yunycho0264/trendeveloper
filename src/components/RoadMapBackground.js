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
import CarouselSlider from "./CarouselSlider";
import { classMethod } from "@babel/types";
import { ComContext } from "../context/Com.context";

const API_URI = process.env.REACT_APP_API_URI;

const RoadMapBackground = (props) => {
  const navigate = useNavigate();
  const { jobKor, transName } = useContext(ComContext);

  const name = localStorage.getItem("name");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  let [roadmapRank, setRoadmapRank] = useState(null);
  const [jobsList, setJobsList] = useState([]);

  const [jobsName, setJobsName] = useState([]);
  const [avgData, setAvgData] = useState([]);
  let [columChart, setColumChart] = useState(null);

  const [stateName, setStateName] = useState("");

  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  const [subject, setSubject] = useState(null);
  const [recomend, setRecomend] = useState(null);
  const [plus, setPlus] = useState(null);

  const [companySilder, setCompanySlider] = useState(null);
  const [bootSilder, setBootSlider] = useState(null);

  const handleButtonClick = (id) => {
    navigate(`?id=${id}`);
  };

  useEffect(() => {
    const fetchRoadmapRank = async () => {
      const respJSON = props.data;
      setRoadmapRank(respJSON);
      console.log(respJSON);
      // console.log(Object.values(respJSON[0][0])[0]);

      const tmpList = respJSON.map((item, index) => {
        return Object.keys(item[0])[0];
      });
      // console.log(tmpList);

      if (urlSearchParams.has("id")) {
        // console.log(id);
        respJSON.forEach((item, index) => {
          if (id === Object.keys(item[0])[0]) {
            if (item[2]) {
              const tmpRecomend = item[2]
                .slice(0, 5) // 최대 5개까지만 잘라냄
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>추천 과목</td> */}
                      <td>{item}</td>
                    </tr>
                  );
                });
              setRecomend(tmpRecomend);
            }
          }
        });
      } else {
        navigate(`?id=${tmpList[0]}`);
      }

      const tmpSlider = () => {
        return <SimpleSlider id={id} />;
      };

      setCompanySlider(tmpSlider);

      const tmpBoot = () => {
        return <CarouselSlider id={id} />;
      };

      console.log(tmpBoot);

      setBootSlider(tmpBoot);

      setJobsList(
        tmpList.map((item) => {
          const tmp = transName(item, jobKor);
          return (
            <div key={item}>
              <button
                className={`${styles.btn} ${
                  urlSearchParams.get("id") === item ? styles.selected : ""
                }`}
                onClick={() => handleButtonClick(item)}
              >
                {tmp}
              </button>
            </div>
          );
        })
      );
      const tmpSubject = respJSON.map((items, index) => {
        let sub;
        if (items[1].length > 0) {
          sub = items[1].map((item, index) => {
            const subject = Object.keys(item)[0];
            const grade = Object.values(item)[0][0];
            return `Subject: ${subject} | Grade: ${grade}`;
          });

          console.log(sub);
        } else {
          sub = ["empty"];
        }
        if (items[4] > 0) {
          sub.push(`added value: ${items[4]}`);
        } else {
          sub.push("No value added.");
        }
        return sub;
      });

      setSubject(tmpSubject);

      console.log(tmpSubject);
      const tmpName = tmpList.map((item, index) => {
        console.log(transName(item, jobKor));
        return transName(item, jobKor);
      });
      const tmpData = respJSON.map((item, index) => {
        return parseFloat(Object.values(item[0])[0].toFixed(2));
      });
      // console.log(tmpData);
      setJobsName(tmpName);
      setAvgData(tmpData);

      let ac = new ColumnChart([tmpName, tmpData, tmpSubject]);
      setColumChart(ac.render());
    };

    fetchRoadmapRank();
    setStateName(transName(id, jobKor));
  }, [id]);

  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            {name}
          </span>{" "}
          <span> 님의 로드맵</span>
          <button
            className={`${styles.btn} `}
            onClick={() => navigate("/roadmap/upload")}
          >
            파일 업로드
          </button>
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
          <span>{name}</span> 님의 상위 직군 역량
        </div>
        <div className={styles["inner-box2"]}>{columChart}</div>

        <div className={`${styles["btn-container"]}`}> {jobsList}</div>

        <div className={styles.label3}>
          <span>{stateName}</span> 와 관련 추천하는 과목이에요!
        </div>
        <div style={{ width: "60%", margin: "20px auto", textAlign: "center" }}>
          <table className="table">
            <tbody>{recomend}</tbody>
          </table>
        </div>

        <div className={styles.label3}>
          <span>{stateName}</span> 와 관련 있는 공고에요!
        </div>
        {bootSilder ? (
          <div className={styles["inner-box3"]}>{bootSilder} </div>
        ) : null}

        <div className={styles["inner-box3"]}>{companySilder}</div>
      </div>
    </div>
  );
};

export default RoadMapBackground;
