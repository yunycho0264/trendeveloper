// Import slick carousel css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import CompanySlide from "./ComapnySlide";

import { useEffect, useState } from "react";

const API_URI = process.env.REACT_APP_API_URI;

const SimpleSlider = (props) => {
  // Define state for randomList
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {
    // Fetch job postings from API
    const id = props.id;
    const fetchJobPostings = async () => {
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

      if (respJSON.length > 0) {
        // Randomly select 6 items from jobPostings
        const shuffledPostings = respJSON.sort(() => 0.5 - Math.random());
        const firstSixPostings = shuffledPostings.slice(0, 6);

        // Set the state of randomList to the selected job postings
        setRandomList(firstSixPostings);
      }
    };

    fetchJobPostings();
  }, [props]);

  // Render the topList elements
  return (
    <div
      style={{
        position: "relative",
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
        }}
      >
        {randomList.map((items, index) => (
          <div key={index}>
            {/* Render the CompanySlide component for each job posting */}
            <CompanySlide data={items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleSlider;
