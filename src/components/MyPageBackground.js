import React, { useState, useEffect, useContext } from "react";
import styles from "../css/MyPage.module.css";
import { ComContext } from "../context/Com.context";
import { useNavigate } from "react-router-dom";

import { BsFillGearFill } from "react-icons/bs";

const API_URI = process.env.REACT_APP_API_URI;

const MyPageBackground = () => {
  const navigate = useNavigate();

  const { jobKor, transName } = useContext(ComContext);

  const name = localStorage.getItem("name");

  const [jobInterest, setJobInterest] = useState([]);
  const [jobsName, setJobsName] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [interestUrl, setInterestUrl] = useState([]);
  const [jobsUrl, setJobsUrl] = useState([]);

  const navigateToJobList = (id) => {
    const url = `/recruitement/list?id=${id}`;
    window.location.href = url;
  };

  useEffect(() => {
    const MyPageData = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URI + "/api/v1/user/mypage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(),
      });

      const respJSON = await response.json();
      console.log(respJSON);

      const interestJobs = respJSON[0];
      const jobInterestTranslated = interestJobs.map((job) =>
        transName(job, jobKor)
      );

      setJobInterest(jobInterestTranslated);

      const jobsNameTranslated = respJSON[1].map((job) =>
        transName(job, jobKor)
      );

      setJobsName(jobsNameTranslated);
      setInfoData(respJSON[2]);
      setInterestUrl(respJSON[0]);
      setJobsUrl(respJSON[1]);
    };

    MyPageData();
  }, []);

  const generateEmptyCells = (count) => {
    const emptyCells = [];

    for (let i = 0; i < count; i++) {
      emptyCells.push(<td key={i} className={styles.emptyCell}></td>);
    }

    return emptyCells;
  };

  const renderVerticalCells = (data) => {
    const cells = [];

    for (let i = 0; i < 5; i++) {
      const value = data[i] || null;
      cells.push(<td key={i}>{value}</td>);
    }

    return cells;
  };

  return (
    <div className={styles.whole}>
      <div className={styles.contents1}>
        <div className={styles.label1}>
          <span className={styles.hilight}>{name}</span> 님의 관심직무
          <span
            className={styles.btn}
            onClick={() => navigate("/roadmap/favorite")}
          >
            <BsFillGearFill size="18px" />
          </span>
        </div>
        <div className={`${styles.box1} ${styles.tableContainer}`}>
          <table>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td onClick={() => navigateToJobList(interestUrl[index])}>
                    {jobInterest[index] || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ... */}
      <div className={styles.contents2}>
        <div className={styles.label2}>추천하는 직무</div>
        <div className={`${styles.box2} ${styles.tableContainer}`}>
          <table>
            <tbody>
              {jobsUrl &&
                jobsUrl.map((job, index) => (
                  <tr key={index}>
                    <td onClick={() => navigateToJobList(job)}>
                      {jobsName[index] || ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.contents3}>
        <div className={styles.label3}>
          <span>{name}</span> 님께서 관심 가질 만한 정보
        </div>
        <div className={styles.box3}>
          {infoData && infoData.length > 0 ? (
            <table>
              <tbody>
                {infoData.map((info, index) => (
                  <tr
                    key={index}
                    onClick={() => (window.location.href = info.link)}
                  >
                    <td>{transName(info.position, jobKor)}</td>
                    <td>{info.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.emptyTable}>No information available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageBackground;
