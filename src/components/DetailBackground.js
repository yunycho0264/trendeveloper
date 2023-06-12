import React, { useState, useEffect } from "react";
import styles from "../css/DetailBackground.module.css";

// API URI from environment variables
const API_URI = process.env.REACT_APP_API_URI;

const DetailBackground = () => {
  // State variables for detail data and worknet link
  let [detailData, setdetailData] = useState(null);
  let [worknetLink, setWorknetLink] = useState("");

  // State variable for response JSON
  let respJSON = useState({});

  // Get URL search parameters
  const urlSearchParams = new URLSearchParams(window.location.search);

  // Function to convert newline characters to <br> tags
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

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        // Get recruitment ID from URL search parameters
        let recruitmentID = urlSearchParams.get("id");

        // Fetch recruitment detail data from API
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

        // Parse response JSON
        respJSON = await resp.json();

        // Set detail data state variable
        setdetailData(respJSON);

        // Set worknet link state variable
        setWorknetLink(
          "http://www.work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?callPage=detail&wantedAuthNo=" +
            recruitmentID
        );

        //logoLink = respJSON["logoLink"];
      }
    };

    fetchData();
  }, []);

  // Render a div with a background and job details
  return (
    <div className={styles["detail-background"]}>
      <div>
        {/* Render the job title or "Loading..." if detailData is null */}
        <div className={styles.title}>
          {detailData ? detailData.wantedTitle : "Loading..."}
        </div>
        {/* Render the "모집 요강" text */}
        <div className={styles.recruite}>모집 요강</div>
        {/* Render the job content with newlines converted to <br> tags */}
        <p className={styles.p1}>
          {convertNewline(detailData ? detailData.jobCont : null)}
        </p>
        {/* Render the "근무 시간" text */}
        <div className={styles.recruite}>근무 시간</div>
        {/* Render the workday work hour content with newlines converted to <br> tags */}
        <p className={styles.p1}>
          {convertNewline(detailData ? detailData.workdayWorkhrCont : null)}
        </p>
      </div>
      {/* Render a link to the worknetLink with a "Go to Employment Information" image */}
      <a
        href={worknetLink}
        target="_blank"
        rel="noreferrer"
        className={styles.work1}
      >
        <p
          style={{
            width: "171px",
            height: "25px",
            marginTop: "30px",
          }}
        >
          <img
            src="https://openapi.work.go.kr/images/btn_goEmpinfo.gif"
            width="auto"
            height="auto"
            alt="Go to Employment Information"
          />
        </p>
      </a>
      {/* Render a link to the work.go.kr website with an "info_source" image */}
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
