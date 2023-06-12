import React, { useState, useEffect, useContext } from "react";
import styles from "../css/MyPage.module.css";
import { ComContext } from "../context/Com.context";
import { useNavigate } from "react-router-dom";

import { BsFillGearFill } from "react-icons/bs";

const API_URI = process.env.REACT_APP_API_URI;

const MyPageBackground = () => {
  const navigate = useNavigate();

  // Get jobKor and transName from ComContext
  const { jobKor, transName } = useContext(ComContext);

  // Get name from localStorage
  const name = localStorage.getItem("name");

  // Set initial states
  const [jobInterest, setJobInterest] = useState([]);
  const [jobsName, setJobsName] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [interestUrl, setInterestUrl] = useState([]);
  const [jobsUrl, setJobsUrl] = useState([]);

  // Function to navigate to job list page
  const navigateToJobList = (id) => {
    const url = `/recruitement/list?id=${id}`;
    window.location.href = url;
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    const MyPageData = async () => {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // Fetch data from API
      const response = await fetch(API_URI + "/api/v1/user/mypage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(),
      });

      // Parse response to JSON
      const respJSON = await response.json();

      // Translate job interests to Korean
      const interestJobs = respJSON[0];
      const jobInterestTranslated = interestJobs.map((job) =>
        transName(job, jobKor)
      );

      // Set job interests state
      setJobInterest(jobInterestTranslated);

      // Translate job names to Korean
      const jobsNameTranslated = respJSON[1].map((job) =>
        transName(job, jobKor)
      );

      // Set job names state
      setJobsName(jobsNameTranslated);

      // Set info data state
      setInfoData(respJSON[2]);

      // Set interest and job URLs states
      setInterestUrl(respJSON[0]);
      setJobsUrl(respJSON[1]);
    };

    // Call MyPageData function
    MyPageData();
  }, []);

  // Render a component with three sections: job interests, recommended jobs, and recommended information
  return (
    <div className={styles.whole}>
      {/* First section: job interests */}
      <div className={styles.contents1}>
        <div className={styles.label1}>
          {/* Display user's name and indicate that this section shows their job interests */}
          <span className={styles.hilight}>{name}</span> 님의 관심직무
          {/* Button to navigate to user's favorite job list */}
          <span
            className={styles.btn}
            onClick={() => navigate("/roadmap/favorite")}
          >
            <BsFillGearFill size="18px" />
          </span>
        </div>
        {/* Table to display user's top 5 job interests */}
        <div className={`${styles.box1} ${styles.tableContainer}`}>
          <table>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  {/* Clicking on a job interest navigates to the job list for that interest */}
                  <td onClick={() => navigateToJobList(interestUrl[index])}>
                    {jobInterest[index] || ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Second section: recommended jobs */}
      <div className={styles.contents2}>
        <div className={styles.label2}>추천하는 직무</div>
        {/* Table to display recommended jobs */}
        <div className={`${styles.box2} ${styles.tableContainer}`}>
          <table>
            <tbody>
              {jobsUrl &&
                jobsUrl.map((job, index) => (
                  <tr key={index}>
                    {/* Clicking on a recommended job navigates to the job list for that job */}
                    <td onClick={() => navigateToJobList(job)}>
                      {jobsName[index] || ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Third section: recommended information */}
      <div className={styles.contents3}>
        <div className={styles.label3}>
          {/* Display user's name and indicate that this section shows information they may be interested in */}
          <span>{name}</span> 님께서 관심 가질 만한 정보
        </div>
        {/* Table to display recommended information */}
        <div className={styles.box3}>
          {infoData && infoData.length > 0 ? (
            <table>
              <tbody>
                {infoData.map((info, index) => (
                  <tr
                    key={index}
                    // Clicking on a recommended information navigates to the link for that information
                    onClick={() => (window.location.href = info.link)}
                  >
                    {/* Translate the position name to Korean and display it */}
                    <td>{transName(info.position, jobKor)}</td>
                    {/* Display the title of the recommended information */}
                    <td>{info.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // If there is no recommended information, display a message
            <div className={styles.emptyTable}>No information available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageBackground;
