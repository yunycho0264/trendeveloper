import React, { useState, useEffect } from "react";
import styles from "../css/NewsList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const NewsList = () => {
  let [newsData, setnewsData] = useState(null);
  let [positiveNews, setPositiveNews] = useState([]);
  let [negativeNews, setNegativeNews] = useState([]);
  let [neutralNews, setNeutralNews] = useState([]);

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

      if (respJSON2) {
        const maxSize = 3;
        const positive = respJSON2
          .filter((news) => news.positive === true)
          .slice(0, maxSize);
        const negative = respJSON2
          .filter((news) => news.negative === true)
          .slice(0, maxSize);
        const neutral = respJSON2
          .filter((news) => !news.positive && !news.negative)
          .slice(0, maxSize);

        setPositiveNews(positive);
        setNegativeNews(negative);
        setNeutralNews(neutral);
      }
    };

    fetchNewsData();
  }, []);

  //뉴스 담을 배열 설정

  // <div className={styles.headline}>
  //     <div className={styles.headline1} href="">1. {newsData ? newsData[0].headline : "Loading..."}</div>
  //     <div className={styles.headline2} href="">2. {newsData ? newsData[1].headline : "Loading..."}</div>
  //     <div className={styles.headline3} href="">3. {newsData ? newsData[2].headline : "Loading..."}</div>
  //   </div>
  return (
    // <div>
    //   <div href="">1. </div>
    //   <div href="">2. </div>
    //   <div href="">3.</div>
    // </div>
    <div className={styles.headline}>
      <h3 className={styles.positive}>Positive News:</h3>
      {positiveNews.map((news, index) => (
        <div key={index}>
          {news ? (
            <a href={news.link} target="_blank" rel="noreferrer">
              {news.headline}
            </a>
          ) : (
            "Loading..."
          )}
        </div>
      ))}

      <h3 className={styles.negative}>Negative News:</h3>
      {negativeNews.map((news, index) => (
        <div key={index}>
          {news ? (
            <a href={news.link} target="_blank" rel="noreferrer">
              {news.headline}
            </a>
          ) : (
            "Loading..."
          )}
        </div>
      ))}

      <h3 className={styles.neutral}>Neutral News:</h3>
      {neutralNews.map((news, index) => (
        <div key={index}>
          {news ? (
            <a href={news.link} target="_blank" rel="noreferrer">
              {news.headline}
            </a>
          ) : (
            "Loading..."
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsList;
