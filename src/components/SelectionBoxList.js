import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoadMap from "../pages/RoadMap";
import styles from "../css/SelectionBoxList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const SelectionTable = ({ selections, subjects, onEdit, onDelete }) => {
  const getSubjectDisplay = (subjectValue, subjects) => {
    const subject = subjects.find((s) => s.value === subjectValue);
    return subject ? subject.display : "";
  };

  const initialSelectionErrors = selections.map(() => ({
    subjectError: false,
    levelError: false,
  }));

  const [selectionErrors, setSelectionErrors] = useState(
    initialSelectionErrors
  );

  const getLevelDisplay = (levelValue) => {
    if (levelValue === 15) {
      return "3회 이상";
    } else if (levelValue === 10) {
      return "2회";
    } else if (levelValue === 5) {
      return "1회";
    }
    return "";
  };

  const handleEditSubject = (index, event) => {
    const { value } = event.target;

    const updatedErrors = [...selectionErrors];
    updatedErrors[index].subjectError = value === "";
    setSelectionErrors(updatedErrors);

    onEdit(index, { subject: value });
  };

  const handleEditLevel = (index, event) => {
    const { value } = event.target;
    const level =
      value === "upper"
        ? 15
        : value === "middle"
        ? 10
        : value === "lower"
        ? 5
        : 0;
    onEdit(index, { level: level });

    const updatedErrors = [...selectionErrors];
    updatedErrors[index].levelError = value === 0;
    setSelectionErrors(updatedErrors);
  };

  const handleSave = (index) => {
    const hasIncompleteSelection =
      !selections[index].level || !selections[index].subject;
    if (hasIncompleteSelection) {
      // alert(
      //   "직군 경험 선택 및 횟수를 선택해 주세요! 저장 버튼까지 눌러주셔야 합니다!"
      // );
      const updatedErrors = [...selectionErrors];
      updatedErrors[index].subjectError = !selections[index].subject;
      updatedErrors[index].levelError = !selections[index].level;
      setSelectionErrors(updatedErrors);

      return;
    }
    onEdit(index, { isEditing: false });
  };
  console.log(selectionErrors);

  return (
    <table className={styles.selectionTable}>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>직군</th>
          <th style={{ textAlign: "center" }}>횟수</th>
          <th style={{ textAlign: "center" }}>수정</th>
        </tr>
      </thead>
      <tbody>
        {selections.map((selection, index) => (
          <tr key={index}>
            <td style={{ textAlign: "center" }}>
              {selection.isEditing ? (
                <select
                  className={`${styles.selectStyles} ${
                    selectionErrors[index].subjectError
                      ? styles.error
                      : styles.notError
                  }`}
                  value={selection.subject}
                  onChange={(event) => handleEditSubject(index, event)}
                >
                  <option value="">직군 경험 선택</option>
                  {subjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.display}
                    </option>
                  ))}
                </select>
              ) : (
                getSubjectDisplay(selection.subject, subjects)
              )}
            </td>
            <td style={{ textAlign: "center" }}>
              {selection.isEditing ? (
                <select
                  className={`${styles.selectStyles} ${
                    selectionErrors[index].levelError
                      ? styles.error
                      : styles.notError
                  }`}
                  value={
                    selection.level === 15
                      ? "upper"
                      : selection.level === 10
                      ? "middle"
                      : selection.level === 5
                      ? "lower"
                      : ""
                  }
                  onChange={(event) => handleEditLevel(index, event)}
                >
                  <option value="">횟수</option>
                  <option value="upper">3회 이상</option>
                  <option value="middle">2회</option>
                  <option value="lower">1회</option>
                </select>
              ) : (
                getLevelDisplay(selection.level)
              )}
            </td>
            <td style={{ marginLeft: "10px", alignItem: "center" }}>
              {selection.isEditing ? (
                <div className={styles.buttonGroup}>
                  <button onClick={() => handleSave(index)}>저장</button>
                  <button onClick={() => onDelete(index)}>삭제</button>
                </div>
              ) : (
                <button onClick={() => onEdit(index, { isEditing: true })}>
                  수정
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const SelectionBox = ({ subjects, onAdd }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const [subjectError, setSubjectError] = useState(false);
  const [levelError, setLevelError] = useState(false);

  const handleSubjectChange = (event) => {
    const { value } = event.target;
    setSelectedSubject(value);
    setSubjectError(value === "");
  };

  const handleLevelChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);
    setLevelError(value === 0);
  };

  const handleAdd = () => {
    if (selectedSubject && selectedLevel) {
      const level =
        selectedLevel === "upper"
          ? 15
          : selectedLevel === "middle"
          ? 10
          : selectedLevel === "lower"
          ? 5
          : 0;
      const newSelection = {
        subject: selectedSubject,
        level: level,
        isEditing: false,
      };
      onAdd(newSelection);
      setSelectedSubject("");
      setSelectedLevel("");
    } else {
      // alert(
      //   "직군 경험 선택 및 횟수를 선택해 주세요! 추가 버튼까지 눌러주셔야 합니다!"
      // );
      setSubjectError(!selectedSubject);
      setLevelError(!selectedLevel);
      return;
    }
  };

  return (
    <div className={styles.selectionBoxContainer}>
      <select
        className={`${styles.selectStyles} ${
          subjectError ? styles.error : styles.notError
        }`}
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">직군 경험 선택</option>
        {subjects.map((subject) => (
          <option key={subject.value} value={subject.value}>
            {subject.display}
          </option>
        ))}
      </select>
      <select
        className={`${styles.selectStyles} ${
          levelError ? styles.error : styles.notError
        }`}
        value={selectedLevel}
        onChange={handleLevelChange}
      >
        <option value="">횟수</option>
        <option value="upper">3회 이상</option>
        <option value="middle">2회</option>
        <option value="lower">1회</option>
      </select>
      <button onClick={handleAdd} className={styles.addButton}>
        추가
      </button>
    </div>
  );
};

const SelectionBoxList = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState([]);
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

  const handleAddSelection = (newSelection) => {
    setSelections([...selections, newSelection]);
  };

  const handleEditSelection = (index, value) => {
    setSelections((prevSelections) => {
      const updatedSelections = [...prevSelections];
      updatedSelections[index] = { ...updatedSelections[index], ...value };
      return updatedSelections;
    });
  };

  const handleDeleteSelection = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };

  const handleSubmit = () => {
    const hasIncompleteSelection = selections.some(
      (selection) => !selection.level !== !selection.subject
    );

    if (hasIncompleteSelection) {
      alert("직군 경험 선택 및 횟수를 선택해 주세요!");
      return;
    }
    console.log(selections);

    const data = selections.reduce((acc, { subject, level }) => {
      acc[subject] = level;
      return acc;
    }, {});

    console.log(data);
    const token = localStorage.getItem("token");

    fetch(API_URI + "/api/v1/lecture/set2", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          navigate("/roadmap/favorite");
          console.log(selections);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.text}>
          <div>
            <span className={styles.highlight}>공모전</span>이나 &nbsp;
            <span className={styles.highlight}>프로젝트 경험</span>&nbsp;등을
            선택해주세요!
          </div>
          <div>
            (아무것도 선택하지 않을 시{" "}
            <span className={styles.highlight}>0회</span>로 간주합니다!)
          </div>
        </div>

        <div>
          <SelectionBox subjects={subjects} onAdd={handleAddSelection} />
        </div>
        <div>
          {selections.length > 0 && (
            <SelectionTable
              selections={selections}
              subjects={subjects}
              onEdit={handleEditSelection}
              onDelete={handleDeleteSelection}
            />
          )}
        </div>
      </div>
      <div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          제출
        </button>
      </div>
    </div>
  );
};

export default SelectionBoxList;
