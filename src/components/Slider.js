import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../css/Main.module.css";

import React from "react";
import CompanySlide from "./ComapnySlide";

import { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";

const API_URI = process.env.REACT_APP_API_URI;

const SimpleSlider = (props) => {
  // 리스트 불러오기
  const [jobPostings, setJobPostings] = useState([]);
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    const id = props.id;
    //console.log(id);
    const fetchJobPostings = async () => {
      // const token = localStorage.getItem('token');
      const response = await fetch(
        API_URI + "/api/v1/recruitment/list?id=" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': 'Bearer ' + token,
          },
        }
      );
      const respJSON = await response.json();
      //console.log(respJSON);
      setJobPostings(respJSON);

      if (respJSON.length > 0) {
        // Randomly select 6 items from jobPostings
        const shuffledPostings = respJSON.sort(() => 0.5 - Math.random());
        const firstSixPostings = shuffledPostings.slice(0, 6);

        setRandomList(firstSixPostings);

        //console.log(firstSixPostings);
      }
    };

    fetchJobPostings();
  }, [props]);
  // //console.log(firstSixPostings[1]);

  // Render the topList elements
  return (
    <div
      style={{
        position: "relative",
        width: "1140px",
        height: "200px",
        background: "#fff",
        display: "flex",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          width: "1140px",
          height: "200px",
        }}
      >
        {randomList.map((items, index) => (
          <div key={index}>
            {/* Corporate logo image */}
            <CompanySlide data={items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
