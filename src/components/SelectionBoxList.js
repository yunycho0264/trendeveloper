// |Great! How can I assist you today?
// |
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoadMap from "../pages/RoadMap";

const API_URI = process.env.REACT_APP_API_URI;

const SelectionBoxList = () => {
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
  const navigate = useNavigate();
  const handleAddSelection = () => {
    if (
      selections.some((selection) => selection.level === "") ||
      selections.some((selection) => selection.subject === "")
    ) {
      // At least one level value is empty, prevent adding the selection
      alert("설정을 완료해 주세요! 업데이트까지 눌러주셔야 합니다!");
      return;
    }
    setSelections([...selections, { subject: "", level: "" }]);
  };

  const handleDeleteSelection = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };

  const handleUpdateSelection = (index, selection) => {
    const updatedSelections = [...selections];
    updatedSelections[index] = selection;
    setSelections(updatedSelections);

    // Send the selected values to the server
    // You can make an API call or perform any desired actions here
    console.log("Selected Values:", updatedSelections);
  };

  const handleSubmit = () => {
    if (
      selections.some((selection) => selection.level === "") ||
      selections.some((selection) => selection.subject === "")
    ) {
      // At least one level value is empty, prevent adding the selection
      alert("설정을 완료해 주세요! 업데이트까지 눌러주셔야 합니다!");
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
          navigate("/roadmap/stat");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div>
        {selections.map((selection, index) => (
          <SelectionBox
            key={index}
            index={index}
            subjects={subjects}
            onDelete={handleDeleteSelection}
            onUpdate={handleUpdateSelection}
          />
        ))}
        <button onClick={handleAddSelection}>Add Selection</button>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default SelectionBoxList;

export const SelectionBox = ({ index, subjects, onDelete, onUpdate }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  const handleUpdate = () => {
    let level = 0;
    if (selectedLevel === "upper") {
      level = 4.5;
    } else if (selectedLevel === "middle") {
      level = 3.5;
    } else if (selectedLevel === "lower") {
      level = 2.5;
    } else {
      level = 0;
    }
    const selection = {
      subject: selectedSubject,
      level: level,
    };
    onUpdate(index, selection);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <select
        value={selectedSubject}
        onChange={handleSubjectChange}
        style={{
          marginRight: "10px",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">-선택-</option>
        {subjects.map((subject) => (
          <option key={subject.value} value={subject.value}>
            {subject.display}
          </option>
        ))}
      </select>
      <label style={{ marginRight: "10px" }}>
        <input
          type="radio"
          value="upper"
          checked={selectedLevel === "upper"}
          onChange={handleLevelChange}
          style={{ marginRight: "5px" }}
        />
        상
      </label>
      <label style={{ marginRight: "10px" }}>
        <input
          type="radio"
          value="middle"
          checked={selectedLevel === "middle"}
          onChange={handleLevelChange}
          style={{ marginRight: "5px" }}
        />
        중
      </label>
      <label style={{ marginRight: "10px" }}>
        <input
          type="radio"
          value="lower"
          checked={selectedLevel === "lower"}
          onChange={handleLevelChange}
          style={{ marginRight: "5px" }}
        />
        하
      </label>
      <button onClick={handleDelete} style={{ marginRight: "10px" }}>
        Delete
      </button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
