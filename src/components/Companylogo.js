import React, { useState, useEffect } from "react";
import styles from "../css/Companylogo.module.css";
import fallbackImage from "../img/No_logo-001.png";

const API_URI = process.env.REACT_APP_API_URI;

const Companylogo = () => {
  let [logoLink, setlogoLink] = useState(null);
  let respJSON = useState({});

  useEffect(() => {
    // Get the URL search parameters
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
      // Check if the URL has an "id" parameter
      if (urlSearchParams.has("id")) {
        // Get the value of the "id" parameter
        let recruitmentID = urlSearchParams.get("id");

        // Fetch the recruitment detail using the API
        let resp = await fetch(
          API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(),
          }
        );
        // Parse the response as JSON
        respJSON = await resp.json();
        // Set the logo link to the response's logo link
        setlogoLink("https://work.go.kr/" + respJSON["logoLink"]);
      }
    };

    fetchData();
  }, []);

  // Handle error when loading the logo image
  const handleError = () => {
    setlogoLink(fallbackImage);
  };

  return (
    <div className={styles["company-logo"]}>
      <div className={styles["test-image"]}>
        {logoLink ? (
          // Render the logo image if the logo link is not null
          <img
            className={styles.bp}
            alt="logo"
            src={logoLink}
            onError={handleError}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Companylogo;
