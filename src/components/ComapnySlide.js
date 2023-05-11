import React, { useState, useEffect } from "react";
import styles from "../css/Companylogo.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const CompanySlide = (props) => {
  let [logoLink, setlogoLink] = useState(null);
  let respJSON = useState({});
  //let logoLink = useState("");
  //
  const data = props.data;

  useEffect(() => {
    // console.log(data);
    const fetchData = async () => {
      if ("id" in data) {
        // console.log(props.id);
        let recruitmentID = data.id;
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
        setlogoLink("https://work.go.kr/" + respJSON["logoLink"]);
        //logoLink = respJSON["logoLink"];
      }
    };
    fetchData();
  }, [data]);

  console.log(logoLink);

  const handleClick = (event) => {
    event.preventDefault();
    window.location.href = `/recruitement/DetailPage?id=${data.id}`;
  };

  return (
    <div className="companyLogo">
      {logoLink ? (
        <img
          className={styles.bp}
          alt="bp-logo"
          src={logoLink}
          onClick={handleClick}
        />
      ) : null}
    </div>
  );
};

export default CompanySlide;
