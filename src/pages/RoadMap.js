import React, { useState, useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../context/Auth.context.js";
import { useNavigate } from "react-router-dom";
import styles from "../css/DetailPage.module.css";
import RoadMapBackground from "../components/RoadMapBackground.js";
import UploadFile from "../components/UploadFile.js";
import SelectionBoxList from "../components/SelectionBoxList.js";
import { rank } from "d3-array";

const API_URI = process.env.REACT_APP_API_URI;

const RoadMap = () => {
  const { isSubmitted, isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState([]);
  const [view, setView] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/signin");
      return;
    }
    const fetchRoadmap = async () => {
      const token = localStorage.getItem("token");
      let count = 5;

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

      const respJSON = await response.json();
      setRoadmap(respJSON);
      console.log(respJSON);

      const tmp = () => {
        let len = respJSON[0].length;
        if (len === 0) return <UploadFile />;
        else return <RoadMapBackground data={respJSON} />;
      };

      setView(tmp());
    };

    fetchRoadmap();
  }, []);

  return (
    <div>
      <div>
        <div className={styles.require}>{view}</div>
      </div>
    </div>
  );
};

export default RoadMap;
