import React, { useState, useContext } from "react";

import { AuthContext } from "../context/Auth.context.js";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RoadMap = () => {
  const { isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/signin");
    }
  }, [isSignedIn]);

  return (
    <div>
      <div>
        <h2>RoadMap</h2>
      </div>
    </div>
  );
};

export default RoadMap;
