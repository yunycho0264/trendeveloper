import React, { useState, useEffect, useMemo } from "react";
import styles from "../css/TrendBackground.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexChart from "./charts";

import { Link, useLocation, useNavigate } from "react-router-dom";
import TrendReport from "./TrendReport";
import HowRank from "./Modal";
import RecruitmentList from "./RecruitmentList";
import RecruitContent from "./RecruitmentContent";

const API_URI = process.env.REACT_APP_API_URI;

const RecruitBackground = () => {
  return (
    <div>
      <RecruitmentList />
      {/* <RecruitContent /> */}
    </div>
  );
};

export default RecruitBackground;
