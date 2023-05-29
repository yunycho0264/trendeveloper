import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import fallbackImage from "../img/No_logo-001.png";

import styles from "../css/BootCamp.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const BootCampContent = (props) => {
  let [logoLink, setlogoLink] = useState(null);
  const [bootTitle, setBootTitle] = useState("");
  let respJSON = useState({});
  //let logoLink = useState("");
  //
  const data = props.data;

  useEffect(() => {
    // //console.log(data);
    const fetchData = async () => {
      if ("link" in data) {
        console.log(data);
        //console.log(data.link);
        setBootTitle(data.title);
        // logoLink = respJSON["logoLink"];
      }
    };
    fetchData();
  }, [data]);

  // //console.log(logoLink);

  const handleClick = (event) => {
    event.preventDefault();
    //console.log(data.link);
    window.location.href = data.link;
  };

  const handleError = () => {
    setlogoLink(fallbackImage);
  };

  return (
    <tr key={props.index}>
      <td className={styles.link}>
        <a href={data.link} target="_blank" rel="noreferrer">
          {data.title}
        </a>
      </td>
      <td style={{ textAlign: "center" }}>{data.due}</td>
      <td style={{ textAlign: "center" }}>{data.st}</td>
      <td style={{ textAlign: "center" }}>{data.fin}</td>
    </tr>
  );
};

export default BootCampContent;
