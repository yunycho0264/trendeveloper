import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React from "react";
import CompanySlide from "./ComapnySlide";

import { useEffect, useState } from "react";

const API_URI = process.env.REACT_APP_API_URI;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

const SimpleSlider = () => {
  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerPadding: "0px", // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
  };

  // 리스트 불러오기
  const [jobPostings, setJobPostings] = useState([]);
  const [topList, setTopList] = useState([]);

  useEffect(() => {
    const fetchJobPostings = async () => {
      // const token = localStorage.getItem('token');

      const response = await fetch(API_URI + "/api/v1/recruitment/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer ' + token,
        },
      });

      const respJSON = await response.json();
      // console.log(respJSON);
      setJobPostings(respJSON);
    };
    fetchJobPostings();
  }, [jobPostings]);
  // console.log(firstSixPostings[1]);

  const firstSixPostings = jobPostings.slice(0, 6); // Get the first six job posting

  // Render the topList elements
  return (
    <div>
      <Slider {...settings}>
        {firstSixPostings.map((items, index) => (
          <div key={index}>
            {/* Corporate logo image */}
            <CompanySlide data={items} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
