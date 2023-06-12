import React, { useState, useEffect, useContext } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import { useNavigate } from "react-router-dom";
import TrendReport from "./TrendReport";
import { ComContext } from "../context/Com.context";

const TrendBackground = (props) => {
  const { jobKor, transName } = useContext(ComContext); // useContext hook to get values from context

  const [topList, setTopList] = useState([]); // useState hook to set and get topList state

  const navigate = useNavigate(); // useNavigate hook to navigate to different routes

  const handleButtonClick = (id) => {
    // function to handle button click
    navigate(`?id=${id}`); // navigate to the route with id parameter
  };
  const ranks = props.ranks; // get ranks from props
  let urlSearchParams = new URLSearchParams(window.location.search); // get URLSearchParams object from window.location.search
  const id = urlSearchParams.get("id"); // get id parameter from URLSearchParams object

  useEffect(() => {
    // useEffect hook to update topList state when id changes
    if (!id) {
      // if id is not present in URL, navigate to the first rank
      navigate(`/trend/stat?id=${ranks[0]}`);
    }

    const tmpList = ranks.map((item, index) => {
      // create a list of buttons for each rank
      const tmp = transName(item, jobKor); // get translated name of the rank
      return (
        <button
          key={item}
          className={`${styles.btn} ${id === item ? styles.selected : ""}`} // add selected class if id matches the rank
          onClick={() => handleButtonClick(item)} // call handleButtonClick function on button click
        >
          {tmp}
        </button>
      );
    });
    setTopList(tmpList); // set topList state with the list of buttons
  }, [id]);

  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className="title s-title ">
            TREN<span>D</span>EVELOPER
          </span>
          가 선정한 최근 공고가 많았던 직군들이에요! {/* Text content */}
        </div>
        <div className={`${styles.rank} ${styles.text}`}>
          <div className={styles.list}>{topList}</div>{" "}
          {/* Display the list of buttons */}
        </div>
      </div>
      <TrendReport jobKor={jobKor} transName={transName} />{" "}
      {/* Render TrendReport component */}
    </div>
  );
};

export default TrendBackground;
