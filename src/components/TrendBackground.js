import React, { useState, useEffect } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";

import { AiFillQuestionCircle } from "react-icons/ai";

import Modal from "react-modal";

const API_URI = process.env.REACT_APP_API_URI;

const TrendBackground = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [cntJopPost, setCntJopPost] = useState({});
  const [jobName, setJopName] = useState("");
  const [eachCnt, setEachCnt] = useState([]);
  const [eachMonth, setEachMonth] = useState([]);

  const [monthKeys, setMonthKeys] = useState([]);
  const [monthValues, setMonthValues] = useState([]);
  let [statJSON, setStatJSON] = useState({});

  let [apexChart, setApexChart] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");
    const fetchData = async () => {
      //const token = localStorage.getItem("token");
      if (urlSearchParams.has("id")) {
        let resp = await fetch(API_URI + "/api/v1/stat?id=" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //"Authorization": "Bearer " + token
          },
          body: JSON.stringify(),
        });

        let respJSON = await resp.json();
        // setStateLink("/trend/"+respJSON['name']);
        //logoLink = respJSON["logoLink"];

        const data = await JSON.parse(respJSON.stat);
        //console.log(data);
        const key = Object.getOwnPropertyNames(data);
        const value = Object.values(data);

        // |Good parts:
        // |- The code is using `await` to handle asynchronous operations, which is a good practice in modern JavaScript.
        // |- The code is using `Object.keys()` to get the keys of an object, which is a built-in method in JavaScript and a good way to iterate over an object's properties.
        // |
        // |Bad parts:
        // |- The `forEach()` method is being used with an `async` function, which can lead to unexpected behavior. The `forEach()` method does not wait for the `async` function to complete before moving on to the next iteration, so the resulting `tmpValues` array may not contain the expected values.
        // |- The `tmpValues` variable is being set to the return value of `forEach()`, which is always `undefined`. This means that `tmpValues` will be an array of `undefined` values, which is not what is intended.
        setStatJSON(data);
        const tmpKeys = await Object.keys(data).sort();
        setMonthKeys(tmpKeys);

        const tmpValues = await Promise.all(
          tmpKeys.map(async (key) => {
            //console.log(key, data[key]);
            return data[key];
          })
        );
        setMonthValues(tmpValues);

        // console.log(eachCnt);
        // console.log(eachMonth);
        // setApexChart(new ApexChart([monthKeys, monthValues]));
        //console.log(monthValues);
        // console.log(apexChart);
        let ac = new ApexChart([tmpKeys, tmpValues]);
        setApexChart(ac.render());
      }
    };
    fetchData();
  }, []);

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
            {/* <ApexChart month={monthKeys} cnt={monthValues} /> */}
            {monthValues}
            {apexChart}
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
};

export default TrendBackground;
