import React, { useState, useEffect } from "react";
import styles from "../css/NewsList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const NewsList = () => {
  let [newsData, setnewsData] = useState(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchNewsData = async () => {
      // const token = localStorage.getItem('token');
      let recruitmentID = urlSearchParams.get("id");

      const response = await fetch(
        API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(),
        }
      );

      const respJSON = await response.json();

      const response2 = await fetch(
        API_URI + "/api/v1/news/list?company=" + respJSON["companyName"],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
          body: JSON.stringify(),
        }
      );

      const respJSON2 = await response2.json();
      console.log(respJSON2);
      setnewsData(respJSON2);
    };

    fetchNewsData();
  }, []);


  return (
    <div className={styles.headline}>
      <div className={styles.headline1} href="">1. {newsData ? newsData[0].headline : "Loading..."}</div>
      <div className={styles.headline2} href="">2. {newsData ? newsData[1].headline : "Loading..."}</div>
      <div className={styles.headline3} href="">3. {newsData ? newsData[2].headline : "Loading..."}</div>
    </div>
  );
};

export default NewsList;
