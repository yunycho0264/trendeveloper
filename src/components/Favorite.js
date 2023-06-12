import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { useNavigate } from "react-router-dom";

import styles from "../css/Favorite.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const Favorite = () => {
  // List of subjects to display as checkboxes
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
  // State to store checkbox values
  const [checkboxValues, setCheckboxValues] = useState({});
  // State to store selected checkboxes
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  // Navigate to a different page
  const navigate = useNavigate();

  // Handle checkbox change event
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedValues = { ...checkboxValues, [name]: checked };

    // Check if maximum of 5 checkboxes are selected
    if (checked) {
      const selectedCount = Object.values(updatedValues).filter(Boolean).length;
      if (selectedCount > 5) {
        alert("최대 5개까지만 선택해주세요");
        return;
      }
    }

    setCheckboxValues(updatedValues);
  };

  // Handle reset button click event
  const handleClickedResetBtn = () => {
    const confirmation = window.confirm(
      "선택된 카테고리를 모두 초기화 하시겠습니까?"
    );

    if (confirmation) {
      setCheckboxValues([]);
    }
  };

  // Handle form submit event
  const handleSubmit = () => {
    const data = selectedCheckbox;

    const token = localStorage.getItem("token");

    // Send POST request to API
    fetch(API_URI + "/api/v1/user/favorite", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .then((data) => {
        // Navigate to a different page
        navigate("/roadmap/stat");
      })
      .catch((error) => console.error(error));
  };

  // Update selectedCheckbox state when checkboxValues state changes
  useEffect(() => {
    const selected = Object.entries(checkboxValues)
      .filter(([key, value]) => value)
      .map(([key, value]) => key);

    setSelectedCheckbox(selected);
  }, [checkboxValues]);

  // Render the following JSX code
  return (
    <>
      {/* Container for the job selection section */}
      <div className={styles.container}>
        {/* Text for the job selection section */}
        <div className={styles.text}>
          <span className={styles.highlight}>관심 직무</span>를 선택해주세요
          (최대 <span className={styles.highlight}>5</span> 개까지 가능합니다.)
        </div>
        {/* Container for the job selection buttons */}
        <div className={styles["btn-container"]}>
          {/* Map through the subjects array to render the job selection buttons */}
          {subjects.map((subject) => {
            // If the checkbox value for the current subject is false, render the button
            if (!checkboxValues[subject.value]) {
              return (
                <div key={subject.value}>
                  {/* Checkbox input for the current subject */}
                  <input
                    type="checkbox"
                    id={subject.value}
                    name={subject.value}
                    checked={checkboxValues[subject.value] || false}
                    onChange={handleCheckboxChange}
                    className={styles.checkbox}
                  />
                  {/* Label for the current subject */}
                  <label htmlFor={subject.value} className={styles.btn}>
                    {subject.display}
                  </label>
                </div>
              );
            }
            // If the checkbox value for the current subject is true, do not render the button
            return null;
          })}
        </div>
      </div>
      {/* Text for the selected job section */}
      <div className={styles["selected-text"]}>선택한 관심 직무</div>
      {/* Container for the selected job checkboxes */}
      <div className={styles["selected-checkboxes"]}>
        {/* Map through the subjects array to render the selected job checkboxes */}
        {subjects.map((subject) => {
          // If the checkbox value for the current subject is true, render the checkbox
          if (checkboxValues[subject.value]) {
            return (
              <div key={subject.value} className={styles["selected-checkbox"]}>
                {/* Checkbox input for the current subject */}
                <input
                  type="checkbox"
                  id={subject.value}
                  name={subject.value}
                  checked={checkboxValues[subject.value] || false}
                  onChange={handleCheckboxChange}
                  className={styles.checkbox}
                />
                {/* Label for the current subject */}
                <label htmlFor={subject.value} className={styles.btn}>
                  {subject.display}
                </label>
              </div>
            );
          }
          // If the checkbox value for the current subject is false, do not render the checkbox
          return null;
        })}
      </div>
      {/* Container for the reset and submit buttons */}
      <div className={styles["button-container"]}>
        {/* Reset button */}
        <button
          type="button"
          onClick={handleClickedResetBtn}
          className={styles["reset-button"]}
        >
          초기화
        </button>
        {/* Submit button */}
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          제출
        </button>
      </div>
    </>
  );
};

export default Favorite;
