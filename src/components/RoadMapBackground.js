// Importing necessary modules and components
import React, { useState, useEffect, useContext } from "react";
import styles from "../css/RoadMap.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";

import { useNavigate } from "react-router-dom";
import ColumnChart from "./columnChart";
import BootCamp from "./BootCamp";
import { ComContext } from "../context/Com.context";
import HowRank from "./Modal";

const RoadMapBackground = (props) => {
  // Import necessary dependencies
  const navigate = useNavigate();
  const { jobKor, transName } = useContext(ComContext);

  // Get name from local storage
  const name = localStorage.getItem("name");

  // Initialize state variables
  let [roadmapRank, setRoadmapRank] = useState(null);
  const [jobsList, setJobsList] = useState([]);
  const [jobsName, setJobsName] = useState([]);
  let [columChart, setColumChart] = useState(null);
  const [stateName, setStateName] = useState("");
  const [recomend, setRecomend] = useState(null);
  const [companySilder, setCompanySlider] = useState(null);
  const [bootSilder, setBootSlider] = useState(null);

  // Get id from URL search params
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  // Handle button click to navigate to a new URL with the given id
  const handleButtonClick = (id) => {
    navigate(`?id=${id}`);
  };

  // useEffect hook to fetch data and update state
  useEffect(() => {
    // async function to fetch data
    const fetchRoadmapRank = async () => {
      // get data from props and update state
      const respJSON = props.data;
      setRoadmapRank(respJSON);

      // create a list of job names from the data
      const tmpList = respJSON.map((item, index) => {
        return Object.keys(item[0])[0];
      });

      // check if id exists in urlSearchParams
      if (urlSearchParams.has("id")) {
        // loop through data to find matching id
        respJSON.forEach((item, index) => {
          if (id === Object.keys(item[0])[0]) {
            // if item has recommendations, create a list of recommended subjects
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
        // if id does not exist in urlSearchParams, navigate to first job in list
        navigate(`?id=${tmpList[0]}`);
      }

      // set company slider and bootcamp slider components
      setCompanySlider(<SimpleSlider id={id} />);
      setBootSlider(<BootCamp id={id} />);

      // create a list of job buttons
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

      // create a list of subjects and grades for each job
      const tmpSubject = respJSON.map((items, index) => {
        let sub;
        if (items[1].length > 0) {
          sub = items[1].map((item, index) => {
            const subject = Object.keys(item)[0];
            const grade = Object.values(item)[0][0];
            return `과목: ${subject} | 평점: ${grade}`;
          });
        } else {
          sub = ["수강한 과목 없음"];
        }
        if (items[4] > 0) {
          sub.push(`공모전 및 프로젝트 점수: ${items[4]}`);
        }
        return sub;
      });

      // create a list of job names, data, and subjects for the column chart
      const tmpName = tmpList.map((item, index) => {
        return transName(item, jobKor);
      });
      const tmpData = respJSON.map((item, index) => {
        return parseFloat(Object.values(item[0])[0].toFixed(2));
      });
      // create a new column chart instance and render it
      setJobsName(tmpName);
      let ac = new ColumnChart([tmpName, tmpData, tmpSubject]);
      setColumChart(ac.render());
    };

    // call fetchRoadmapRank function and update state with job name
    fetchRoadmapRank();
    setStateName(transName(id, jobKor));
  }, [id]);

  // Render function that returns JSX
  return (
    <div>
      {/* Contents section */}
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          {/* Clicked job name */}
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            {name}
          </span>{" "}
          <span> 님을 위한 추천</span>
          {/* Button to navigate to upload page */}
          <button
            className={`${styles.btn} `}
            onClick={() => navigate("/roadmap/upload")}
          >
            파일 업로드
          </button>
        </div>
      </div>

      {/* Background section */}
      <div className={styles.background}>
        {/* Recommended jobs */}
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

        {/* User's skill rank */}
        <div className={styles.label2}>
          <span>{name}</span> 님의 상위 직군 역량
          <HowRank />
        </div>
        <div className={styles["inner-box2"]}>{columChart}</div>

        {/* Recommended jobs list */}
        <div className={`${styles["btn-container"]}`}> {jobsList}</div>

        {/* Recommended subjects */}
        <div className={styles.label3}>
          <span>{stateName}</span> 와 관련 추천하는 과목이에요!
        </div>
        <div style={{ width: "60%", margin: "20px auto", textAlign: "center" }}>
          <table className="table">
            <tbody>{recomend}</tbody>
          </table>
        </div>

        {/* Recommended bootcamps */}
        <div className={styles.label3}>
          <span>{stateName}</span> 와 관련 있는 부트캠프에요!
        </div>
        <div className={styles["inner-box3"]}>{bootSilder} </div>

        {/* Recommended companies */}
        <div className={styles.label3}>
          <span>{stateName}</span> 와 관련 있는 공고에요!
        </div>
        <div className={styles["inner-box3"]}>{companySilder}</div>
      </div>
    </div>
  );
};

export default RoadMapBackground;
