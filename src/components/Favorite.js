import React, { useState, useEffect, useMemo } from "react";
import "../css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "../css/Favorite.module.css";

import RecruitmentList from "./RecruitmentList";
import { Navigate } from "react-router-dom/dist";
const API_URI = process.env.REACT_APP_API_URI;

const Favorite = () => {
  const subjects = [
    { display: "서버/백엔드 개발자", value: "back" },
    { display: "프론트엔드 개발자", value: "front" },
    { display: "웹 풀스택 개발자", value: "full" },
    { display: "안드로이드 개발자", value: "android" },
    { display: "IOS 개발자", value: "ios" },
    { display: "크로스플랫폼 개발자", value: "crossp" },
    { display: "게임 클라이언트 개발자", value: "gclient" },
    { display: "게임 서버 개발자", value: "gserver" },
    { display: "DBA", value: "dba" },
    { display: "빅데이터 엔지니어", value: "bigdata" },
    { display: "인공지능/머신러닝", value: "ai" },
    { display: "devops/시스템 엔지니어", value: "devops" },
    { display: "정보보안 담당자", value: "security" },
    { display: "QA 엔지니어", value: "qa" },
    { display: "개발 PM", value: "pm" },
    { display: "HW/임베디드", value: "embeded" },
    { display: "SW/솔루션", value: "solution" },
    { display: "웹퍼블리셔", value: "wpublisher" },
    { display: "VR/AR/3D", value: "vr" },
    { display: "블록체인", value: "blockchain" },
    { display: "기술지원", value: "support" },
  ];
  const [checkboxValues, setCheckboxValues] = useState({});
  const [selectedCheckbox, setSelectedCheckbox] = useState("");

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedValues = { ...checkboxValues, [name]: checked };

    if (checked) {
      const selectedCount = Object.values(updatedValues).filter(Boolean).length;
      if (selectedCount > 5) {
        alert("최대 5개까지만 선택해주세요");
        return;
      }
    }

    setCheckboxValues(updatedValues);
  };

  const handleClickedResetBtn = () => {
    const confirmation = window.confirm(
      "선택된 카테고리를 모두 초기화 하시겠습니까?"
    );

    if (confirmation) {
      setCheckboxValues([]);
    }
  };

  const handleSubmit = () => {
    console.log(selectedCheckbox);
    const data = selectedCheckbox;

    fetch(API_URI + "/api/v1/user/favorite", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log(data);
        navigate("/roadmap/stat");
        console.log(selectedCheckbox);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const selected = Object.entries(checkboxValues)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);

    console.log(selected);
    setSelectedCheckbox(selected);
  }, [checkboxValues]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.text}>
          <span className={styles.highlight}>관심 직무</span>를 선택해주세요
          (최대 <span className={styles.highlight}>5</span> 까지 가능합니다.)
        </div>
        <div className={styles["btn-container"]}>
          {subjects.map((subject) => {
            if (!checkboxValues[subject.value]) {
              return (
                <div key={subject.value}>
                  <input
                    type="checkbox"
                    id={subject.value}
                    name={subject.value}
                    checked={checkboxValues[subject.value] || false}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  <label htmlFor={subject.value} className={styles.btn}>
                    {subject.display}
                  </label>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className={styles["selected-text"]}>선택한 관심 직무</div>
      <div className={styles["selected-checkboxes"]}>
        {subjects.map((subject) => {
          if (checkboxValues[subject.value]) {
            return (
              <div key={subject.value}>
                <input
                  type="checkbox"
                  id={subject.value}
                  name={subject.value}
                  checked={checkboxValues[subject.value] || false}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                <label htmlFor={subject.value} className={styles.btn}>
                  {subject.display}
                </label>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className={styles["button-container"]}>
        <button
          type="button"
          onClick={handleClickedResetBtn}
          className={styles["reset-button"]}
        >
          초기화
        </button>

        <button className={styles["submit-button"]} onClick={handleSubmit}>
          제출
        </button>
      </div>
    </>
  );
};

export default Favorite;
