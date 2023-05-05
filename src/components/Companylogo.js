import React, { useState, useEffect } from "react";
import styles from "../css/Companylogo.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const Companylogo = () => {
  let [logoLink, setlogoLink] = useState(null);
  let respJSON = useState({});
  //let logoLink = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        console.log(urlSearchParams.get("id"));
        let recruitmentID = urlSearchParams.get("id");
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
        console.log(respJSON);
        setlogoLink("https://work.go.kr/" + respJSON["logoLink"]);
        //logoLink = respJSON["logoLink"];
      }
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

export default Companylogo;
