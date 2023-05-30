import React, { useState, useEffect } from "react";
import styles from "../css/NewsList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const NewsList = () => {
  let [newsData, setnewsData] = useState(null);
  let [positiveNews, setPositiveNews] = useState([]);
  let [negativeNews, setNegativeNews] = useState([]);
  let [neutralNews, setNeutralNews] = useState([]);

  const urlSearchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
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

  return (
    <div className={styles.newsList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={`${styles.categoryTitle} ${styles.positive}`}>
              긍정 감성 뉴스 목록
            </th>
            <th className={`${styles.categoryTitle} ${styles.neutral}`}>
              중립 감성 뉴스 목록
            </th>
            <th className={`${styles.categoryTitle} ${styles.negative}`}>
              부정 감성 뉴스 목록
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul className={styles.newsItems}>
                {positiveNews.map((news, index) => (
                  <li key={index} className={styles.newsItem}>
                    {news ? (
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.headline}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul className={styles.newsItems}>
                {neutralNews.map((news, index) => (
                  <li key={index} className={styles.newsItem}>
                    {news ? (
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.headline}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <ul className={styles.newsItems}>
                {negativeNews.map((news, index) => (
                  <li key={index} className={styles.newsItem}>
                    {news ? (
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.headline}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
