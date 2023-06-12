import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/DetailPage.module.css";
import RoadMapBackground from "../components/RoadMapBackground.js";

// API URI
const API_URI = process.env.REACT_APP_API_URI;

const RoadMap = () => {
  const navigate = useNavigate();
  const [view, setView] = useState([]);

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    // If token doesn't exist, redirect to signin page
    if (!token) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/signin");
      return;
    }

    // Fetch roadmap data
    const fetchRoadmap = async () => {
      const token = localStorage.getItem("token");
      let count = 5;

      // Send GET request to API
      const response = await fetch(
        API_URI + "/api/v1/lecture/get?count=" + count,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(),
        }
      );

      // Get response data in JSON format
      const respJSON = await response.json();

      // If there is no data, redirect to roadmap upload page
      if (!respJSON.length) navigate("/roadmap/upload");

      // Check if the progress value is greater than 100, if so, redirect to roadmap upload page
      const tmp = () => {
        let value = Object.values(respJSON[0][0]);
        if (value > 100) {
          navigate("/roadmap/upload");
        }
        return <RoadMapBackground data={respJSON} />;
      };

      // Set the view state with the RoadMapBackground component
      setView(tmp());
    };

    fetchRoadmap();
  }, []);

  return (
    <div>
      <div>
        {/* Render the RoadMapBackground component */}
        <div className={styles.require}>{view}</div>
      </div>
    </div>
  );
};

export default RoadMap;
