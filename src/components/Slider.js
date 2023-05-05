import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React from "react";
import Companylogo from "./Companylogo";
import CompanySlide from "./ComapnySlide";

import { useEffect, useState } from "react";

const API_URI = process.env.REACT_APP_API_URI;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "inline-block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
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

      setJobPostings(respJSON);
    };

    fetchJobPostings();
  }, []);

  // |Good parts:
  // |- The code is using the `slice` method to get the first six job postings from an array, which is a concise and efficient way to achieve this.
  // |- The `map` method is used to generate a new array of elements based on the first six job postings. This is a common and effective way to generate dynamic content in React.
  // |- The `key` prop is used to uniquely identify each element in the array, which is important for React to efficiently update the DOM when changes occur.
  // |
  // |Bad parts:
  // |- It's not clear where `jobPostings` and `setTopList` are coming from, so it's difficult to understand the context of this code.
  // |- The `index` parameter in the `map` function is not a reliable way to generate unique keys for elements, especially if the order of the array can change. It's better to use a unique identifier from the data itself, if available.
  const firstSixPostings = jobPostings.slice(0, 6); // Get the first six job postings

  // setTopList(() => {
  //   const list = firstSixPostings.map((items, index) => (
  //     <div key={index}>
  //       {/* Corporate logo image */}
  //       <CompanySlide element={items} />
  //     </div>
  //   ));
  //   return list;
  // }); // Update the topList state with the generated elements

  // Render the topList elements
  return (
    <div>
      <Slider {...settings}>
        <CompanySlide element={firstSixPostings[0]} />
      </Slider>
    </div>
  );
};

export default SimpleSlider;
