import React, { useState, useEffect } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexCharts from "./charts";

import { AiFillQuestionCircle } from "react-icons/ai";

import Modal from "react-modal";

const API_URI = process.env.REACT_APP_API_URI;

const TrendBackground = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cntJopPost, setCntJopPost] = useState({});
  const [stateLink, setStateLink] = useState([]);
  const [eachCnt, setEachCnt] = useState([]);
  const [eachMonth, setEachMonth] = useState([]);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [jobName, setJopName] = useState("");

  const fetchData = async () => {
    // console.log(urlSearchParams.get("id"));
    setJopName(urlSearchParams.get("id"));
    // console.log(jobName);
    //const token = localStorage.getItem("token");

    let resp = await fetch(API_URI + "/api/v1/stat?id=" + jobName, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": "Bearer " + token
      },
      body: JSON.stringify(),
    });

    let respJSON = await resp.json();
    console.log(respJSON);
    console.log(cntJopPost);
    setCntJopPost(respJSON);
    console.log(cntJopPost);
    // setStateLink("/trend/"+respJSON['name']);
    //logoLink = respJSON["logoLink"];

    const data = JSON.parse(respJSON.stat);
    console.log(data);
    const key = Object.getOwnPropertyNames(data);
    const value = Object.values(data);

    setEachCnt(value);
    setEachMonth(key);

    console.log(eachCnt);
    console.log(eachMonth);
  };
  useEffect(() => {
    fetchData();
  }, [jobName]);

  // console.log(eachCnt);
  // console.log(eachMonth);
  // fetchData();
  // console.log(cntJopPost.name);
  // console.log(cntJopPost.stat);
  // const data = JSON.parse(cntJopPost.stat);
  // console.log(data);

  // const key = Object.getOwnPropertyNames(data);
  // const value = Object.values(data);
  // console.log(key);
  // console.log(value);

  // setEachCnt(value);
  // setEachMonth(key);

  // setEachCnt((cntJopPost)=>
  // {
  //   eachCnt = cntJopPost.map
  // })

  // for (const key in Object.keys(cntJopPost.stat)) {
  //   console.log(cntJopPost.stat[key]); // "쓴 맛", "고소한 맛", "달콤한 맛"
  // }

  if (cntJopPost.name === jobName) {
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
            <ol className="list">
              <li>풀스택</li>
            </ol>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={`${styles.next} ${styles.text}`}>
            직군 트렌드 순위는 어떻게 산정할까요?
          </div>
          <div className={`${styles.box} ${styles.how}`}></div>
        </div>
        {/* 클릭한 직업 */}
        <div className={`${styles.background} ${styles.box}`}>
          <div className={styles.contents}>
            <div className={`${styles.text} ${styles["inner-text"]} `}>
              <span className={`${styles["clicked-job"]} ${styles.text}`}>
                풀스택 개발자
              </span>{" "}
              의 과거 6개월 간 채용 동향이에요!
            </div>
            <div className={`${styles.box} ${styles["inner-box"]}`}>
              {/* month={eachMonth} cnt={eachCnt} */}
              <ApexCharts
                name={cntJopPost.name}
                month={eachMonth}
                cnt={eachCnt}
              />
            </div>
          </div>
          <div className={styles.contents}>
            <div className={`${styles.text} ${styles["inner-text"]} `}>
              <span className={`${styles["clicked-job"]} ${styles.text}`}>
                풀스택 개발자
              </span>{" "}
              와 다른 직군의 뉴스 언급도를 비교해볼까요?
            </div>
            <div className={`${styles.box} ${styles["inner-box"]}`}>
              <ApexCharts />
            </div>
          </div>
          <div className={styles.contents}>
            <div className={`${styles.text} ${styles["inner-text"]} `}>
              <span className={`${styles["clicked-job"]} ${styles.text}`}>
                풀스택 개발자
              </span>{" "}
              와 관련된 다른 공고도 확인해볼까요?
            </div>
            <div className={`${styles.box} ${styles["inner-box"]}`}>
              <SimpleSlider />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TrendBackground;
