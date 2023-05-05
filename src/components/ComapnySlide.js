import React, { useState, useEffect } from "react";
import styles from "../css/Companylogo.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const CompanySlide = (props) => {
  let [logoLink, setlogoLink] = useState(null);
  let respJSON = useState({});
  //let logoLink = useState("");
  useEffect(() => {
    const fetchData = async () => {
      let recruitmentID = props.element.id;
      //const token = localStorage.getItem("token");

      let resp = await fetch(
        API_URI + "/api/v1/recruitment/DetailPage?id=" + recruitmentID,
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
      setlogoLink("https://work.go.kr/" + respJSON["logoLink"]);
    };

    fetchData();
  }, []);

  return (
    <div className={styles["company-logo"]}>
      <div className={styles["test-image"]}>
        {logoLink ? (
          <img className={styles.bp} alt="bp-logo" src={logoLink} />
        ) : null}
      </div>
    </div>
  );
};

export default CompanySlide;
