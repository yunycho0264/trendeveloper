import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../css/BootCamp.module.css";

import React, { useEffect, useState } from "react";

import BootCampContent from "./BootCampContent";

const API_URI = process.env.REACT_APP_API_URI;

const BootCamp = (props) => {
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    const id = props.id;
    const fetchBootCamp = async () => {
      const url = API_URI + "/api/v1/bootcamp/list?id=" + id;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respJSON = await response.json();
      if (respJSON.length > 0) {
        // Shuffle the array of postings randomly
        const shuffledPostings = respJSON.sort(() => 0.5 - Math.random());
        // Select the first six postings from the shuffled array
        const firstSixPostings = shuffledPostings.slice(0, 6);

        // Map the selected postings to BootCampContent components and set the state
        setRandomList(
          firstSixPostings.map((items, index) => (
            <BootCampContent key={index} data={items} />
          ))
        );
      } else {
        // If there are no postings, display a message in a table row
        setRandomList(
          <tr>
            <td colSpan={"4"}>등록된 게시물 정보가 없습니다.</td>
          </tr>
        );
      }
    };
    fetchBootCamp();
  }, [props]);

  return (
    // Render a table with a header row and a body containing the BootCampContent components
    <table className={styles.table}>
      <thead>
        <tr>
          <th className="index">제목</th>
          <th className="index">접수 마감</th>
          <th className="index">시작일</th>
          <th className="index">종료일</th>
        </tr>
      </thead>
      <tbody>{randomList}</tbody>
    </table>
  );
};

export default BootCamp;
