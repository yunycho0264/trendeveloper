import React, { useState, useEffect } from "react";
import styles from "../css/Main.module.css";
import fallbackImage from "../img/No_logo-001.png";

const API_URI = process.env.REACT_APP_API_URI;

const CompanySlide = (props) => {
  let [logoLink, setlogoLink] = useState(null); // State variable for logo link
  const [companyName, setCompanyName] = useState(""); // State variable for company name
  const [closeDt, setcloseDt] = useState(""); // State variable for close date
  const [regDt, setregDt] = useState(""); // State variable for registration date
  const [jobsNm, setjobsNm] = useState(""); // State variable for job name
  let respJSON = useState({}); // State variable for response JSON
  const data = props.data; // Props variable for data

  useEffect(() => {
    // useEffect hook to fetch data
    const fetchData = async () => {
      if ("wantedAuthNo" in data) {
        // Check if wantedAuthNo is in data
        let recruitmentID = data.wantedAuthNo; // Set recruitmentID to wantedAuthNo

        let resp = await fetch(
          // Fetch data from API
          API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          }
        );
        respJSON = await resp.json(); // Set respJSON to response JSON
        console.log(respJSON);

        setlogoLink(`https://work.go.kr/${respJSON.logoLink}`); // Set logoLink state variable to logo link from response JSON
        setCompanyName(respJSON.companyName); // Set companyName state variable to company name from response JSON
        setcloseDt(respJSON.closeDt); // Set closeDt state variable to close date from response JSON
        setregDt(respJSON.regDt); // Set regDt state variable to registration date from response JSON
        setjobsNm(respJSON.jobsNm); // Set jobsNm state variable to job name from response JSON
        //logoLink = respJSON["logoLink"];
      }
    };
    fetchData();
  }, [props]); // Run useEffect hook when props change

  const handleClick = (event) => {
    // Function to handle click event
    event.preventDefault(); // Prevent default behavior
    window.location.href = `/recruitement/detail?id=${data.wantedAuthNo}`; // Redirect to recruitment detail page
  };

  const handleError = () => {
    // Function to handle error
    setlogoLink(fallbackImage); // Set logoLink state variable to fallback image
  };

  // Render a job card with logo, company name, job name, and recruitment period
  // If logoLink is not provided, the card will not be rendered
  return (
    logoLink && (
      <div className={styles.container} onClick={handleClick}>
        <div className={styles.companyNameInfo}>{companyName}</div>
        <img
          className={styles.image}
          alt="로고 이미지가 없습니다" // Display this message if the logo image is not available
          src={logoLink}
          onError={handleError} // Call handleError function if the image fails to load
        />
        <div className={styles.jobsNmInfo}>
          <span>{jobsNm}</span>
        </div>
        <div className={styles.overlay}>
          <div className={styles.text}>
            모집 기간
            {/* Display "모집 기간" text */}
            <span>
              {regDt} ~ {closeDt}
              {/* Display the recruitment period */}
            </span>
          </div>
        </div>
      </div>
    )
  );
};
export default CompanySlide;
