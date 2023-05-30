import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../css/BootCamp.module.css";

import React, { useEffect, useState } from "react";

import BootCampContent from "./BootCampContent";

const API_URI = process.env.REACT_APP_API_URI;

const BootCamp = (props) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    const id = props.id;
    console.log(id);
    const fetchBootCamp = async () => {
      const url = API_URI + "/api/v1/bootcamp/list?id=" + id;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const respJSON = await response.json();
      console.log(respJSON.length);
      if (respJSON.length > 0) {
        const shuffledPostings = respJSON.sort(() => 0.5 - Math.random());
        const firstSixPostings = shuffledPostings.slice(0, 6);

        setRandomList(
          firstSixPostings.map((items, index) => (
            <BootCampContent key={index} data={items} />
          ))
        );
      } else {
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
    <table className={styles.table}>
      <thead>
        <tr>
          <th className="index">제목</th>
          <th className="index">마감일</th>
          <th className="index">시작일</th>
          <th className="index">종료일</th>
        </tr>
      </thead>
      <tbody>{randomList}</tbody>
    </table>
  );
};

export default BootCamp;
