import React, { useState, useEffect } from "react";
import styles from "../css/Main.module.css";
import Loading from "./Loading";
import fallbackImage from "../img/No_logo-001.png";

const API_URI = process.env.REACT_APP_API_URI;

const CompanySlide = (props) => {
  let [logoLink, setlogoLink] = useState(null);
  const [companyName, setCompanyName] = useState("");
  let respJSON = useState({});
  //let logoLink = useState("");
  //
  const data = props.data;

  useEffect(() => {
    // //console.log(data);
    const fetchData = async () => {
      if ("wantedAuthNo" in data) {
        // //console.log(props.id);
        let recruitmentID = data.wantedAuthNo;
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
        //console.log(respJSON);

        setlogoLink(`https://work.go.kr/${respJSON.logoLink}`);
        setCompanyName(respJSON.companyName);
        //logoLink = respJSON["logoLink"];
      }
    };
    fetchData();
  }, [props]);

  // //console.log(logoLink);

  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = `/recruitement/detail?id=${data.wantedAuthNo}`;
  };

  const handleError = () => {
    setlogoLink(fallbackImage);
  };

  return (
    logoLink && (
      <div className={styles.container} onClick={handleClick}>
        <img
          className={styles.image}
          alt="로고 이미지가 없습니다"
          src={logoLink}
          onError={handleError}
        />
        <div className={styles.overlay}>
          <div className={styles.text}>{companyName}</div>
        </div>
      </div>
    )
  );
};
export default CompanySlide;
