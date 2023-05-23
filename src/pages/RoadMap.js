import React, { useState, useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../context/Auth.context.js";
import { useNavigate } from "react-router-dom";
import styles from "../css/DetailPage.module.css";
import RoadMapBackground from "../components/RoadMapBackground.js";
import UploadFile from "../components/UploadFile.js";

const API_URI = process.env.REACT_APP_API_URI;

const RoadMap = () => {
  const { isSubmitted, isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/signin");
      return;
    }
    const fetchRoadmap = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(API_URI + "/api/v1/lecture/get?count=" + 5, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(),
      });

      const respJSON = await response.json();
      setRoadmap(respJSON);
      console.log(respJSON);
    };

    fetchRoadmap();
  }, [isSubmitted]);

  // useEffect(() => {

  //   const fetchRoadmapRank = async () => {
  //     try {
  //       const response = await fetch(
  //         API_URI + "/api/v1/lecture/get?count=" + 5,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //         }
  //       );
  //       const respJSON = await response.json();
  //       setRoadmap(respJSON);
  //       console.log(respJSON);
  //       console.log(respJSON.length);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRoadmapRank();

  //   console.log(isSubmitted);
  //   console.log("rendering");
  // }, []);

  return (
    <div>
      <div>
        <div className={styles.require}>
          {roadmap.length > 0 ? <RoadMapBackground /> : <UploadFile />}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
