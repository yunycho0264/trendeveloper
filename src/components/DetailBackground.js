import React, { useState, useEffect } from "react";
import styles from "../css/DetailBackground.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const DetailBackground = () => {
  let [detailData, setdetailData] = useState(null);
  let [worknetLink, setWorknetLink] = useState("");
  let respJSON = useState({});
  //let logoLink = useState("");
  const urlSearchParams = new URLSearchParams(window.location.search);

  const convertNewline = (text) => {
    if (!text) return "Loading...";
    return text
      .replace(/&gt;/g, ">")
      .split("\r\n")
      .map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        console.log(urlSearchParams.get("id"));
        let recruitmentID = urlSearchParams.get("id");
        //const token = localStorage.getItem("token");

        let resp = await fetch(
          API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //"Authorization": "Bearer " + token
            },
            body: JSON.stringify(),
          }
        );
        respJSON = await resp.json();
        console.log(respJSON);
        setdetailData(respJSON);
        setWorknetLink(
          "http://www.work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?callPage=detail&wantedAuthNo=" +
            recruitmentID
        );
        //logoLink = respJSON["logoLink"];
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles["detail-background"]}>
      <div>
        <div className={styles.title}>
          {detailData ? detailData.wantedTitle : "Loading..."}
        </div>
        <div className={styles.recruite}>모집 요강</div>
        <p className={styles.p1}>
          {convertNewline(detailData ? detailData.jobCont : null)}
        </p>
        <div className={styles.recruite}>근무 시간</div>
        <p className={styles.p1}>
          {convertNewline(detailData ? detailData.workdayWorkhrCont : null)}
        </p>

        <a
          href={worknetLink}
          target="_blank"
          rel="noreferrer"
          className={styles.work1}
        >
          <div style={{ width: "171px", height: "25px" }}>
            <img
              src="https://openapi.work.go.kr/images/btn_goEmpinfo.gif"
              width="auto"
              height="auto"
              alt="Go to Employment Information"
            />
          </div>
        </a>
      </div>
      <a
        href={"https://www.work.go.kr"}
        target="_blank"
        rel="noreferrer"
        className={styles.work2}
      >
        <div style={{ width: "625px", height: "40px" }}>
          <img
            src="https://openapi.work.go.kr/images/info_source.gif"
            width="auto"
            height="auto"
            alt="Go to Employment Information"
          />
        </div>
      </a>
    </div>
  );
};

export default DetailBackground;
