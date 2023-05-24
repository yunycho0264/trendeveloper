import React, { useState, useEffect } from "react";
import styles from "../css/Main.module.css";
import Loading from "./Loading";
import fallbackImage from "../img/No_logo-001.png";

import image1 from "../img/부트캠프.png";
import image2 from "../img/임시배너-001.png";
import image3 from "../img/임시배너-002.png";

const API_URI = process.env.REACT_APP_API_URI;

const BootCampSlide = (props) => {
  let [logoLink, setlogoLink] = useState(null);
  const [bootTitle, setBootTitle] = useState("");
  let respJSON = useState({});
  //let logoLink = useState("");
  //
  const data = props.data;

  useEffect(() => {
    // console.log(data);
    const fetchData = async () => {
      if ("link" in data) {
        console.log(data);
        let recruitmentID = data.wantedAuthNo;
        //const token = localStorage.getItem("token");
        // let resp = await fetch(
        //   API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
        //   {
        //     method: "GET",
        //     headers: {
        //       "Content-Type": "application/json",
        //       //"Authorization": "Bearer " + token
        //     },
        //     body: JSON.stringify(),
        //   }
        // );
        // respJSON = await resp.json();
        // console.log(respJSON);
        setlogoLink(image1);
        setBootTitle(data.title);
        // logoLink = respJSON["logoLink"];
      }
    };
    fetchData();
  }, [data]);

  // console.log(logoLink);

  const handleClick = (event) => {
    event.preventDefault();
    console.log(data.link);
    window.location.href = data.link;
  };

  const handleError = () => {
    setlogoLink(fallbackImage);
  };

  return (
    <>
      {logoLink ? (
        <img
          className={styles.bp}
          alt="bp-logo"
          src={logoLink}
          onClick={handleClick}
          onError={handleError}
        />
      ) : null}
    </>
  );
};

export default BootCampSlide;
