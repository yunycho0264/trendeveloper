import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/SelectionBoxList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const SelectionTable = ({
  selections,
  selectionErrors,
  subjects,
  onEdit,
  onDelete,
  setSelectionErrors,
}) => {
  const getSubjectDisplay = (subjectValue, subjects) => {
    const subject = subjects.find((s) => s.value === subjectValue);
    return subject ? subject.display : "";
  };
  const getLevelDisplay = (levelValue) => {
    if (levelValue === "") return "";
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
    const updatedErrors = [...selectionErrors];
    if (!updatedErrors[index]) {
      updatedErrors[index] = {}; // Create the object if it doesn't exist
    }
    updatedErrors[index].levelError = value === 0;
    setSelectionErrors(updatedErrors);

    onEdit(index, { level: level });
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

  // Render a table with selection data
  return (
    <table className={styles.selectionTable}>
      <thead>
        <tr>
          {/*Table header for job field */}
          <th style={{ textAlign: "center" }}>직군</th>
          {/*Table header for frequency */}
          <th style={{ textAlign: "center" }}>횟수</th>
          {/* Table header for edit button */}
          <th style={{ textAlign: "center" }}>수정</th>
        </tr>
      </thead>
      <tbody>
        {selections.map(
          (
            selection,
            index // Loop through each selection data
          ) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>
                {selection.isEditing ? ( // If selection is being edited, show select input
                  <select
                    className={`${styles.selectStyles} ${
                      selectionErrors[index].subjectError // If there is an error in the subject field, show error style
                        ? styles.error
                        : styles.notError
                    }`}
                    value={selection.subject}
                    onChange={(event) => handleEditSubject(index, event)}
                  >
                    {/* Default option for subject select input */}
                    <option value="">직군 경험 선택</option>
                    {subjects.map(
                      (
                        subject // Loop through each subject option
                      ) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.display}
                        </option>
                      )
                    )}
                  </select>
                ) : (
                  getSubjectDisplay(selection.subject, subjects) // If selection is not being edited, show subject display
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {selection.isEditing ? ( // If selection is being edited, show select input
                  <select
                    className={`${styles.selectStyles} ${
                      selectionErrors[index].levelError // If there is an error in the level field, show error style
                        ? styles.error
                        : styles.notError
                    }`}
                    value={
                      selection.level === 15 // Set value of select input based on level value
                        ? "upper"
                        : selection.level === 10
                        ? "middle"
                        : selection.level === 5
                        ? "lower"
                        : ""
                    }
                    onChange={(event) => handleEditLevel(index, event)}
                  >
                    {/* Default option for level select input */}
                    <option value="">횟수</option>
                    {/* Option for level select input */}
                    <option value="upper">3회 이상</option>
                    {/* Option for level select input */}
                    <option value="middle">2회</option>
                    {/* Option for level select input */}
                    <option value="lower">1회</option>
                  </select>
                ) : (
                  getLevelDisplay(selection.level) // If selection is not being edited, show level display
                )}
              </td>
              <td style={{ marginLeft: "10px", alignItem: "center" }}>
                {selection.isEditing ? ( // If selection is being edited, show save and delete button
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleSave(index)}>저장</button>
                    {/* Save button */}
                    <button onClick={() => onDelete(index)}>삭제</button>
                    {/* Delete button */}
                  </div>
                ) : (
                  <button onClick={() => onEdit(index, { isEditing: true })}>
                    {/* If selection is not being edited, show edit button */}
                    수정
                  </button>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

// This is a functional component that receives two props: subjects and onAdd.
const SelectionBox = ({ subjects, onAdd }) => {
  // Two state variables are declared using the useState hook.
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Two more state variables are declared to handle errors.
  const [subjectError, setSubjectError] = useState(false);
  const [levelError, setLevelError] = useState(false);

  // This function handles changes in the selected subject.
  const handleSubjectChange = (event) => {
    const { value } = event.target;
    setSelectedSubject(value);
    setSubjectError(value === "");
  };

  // This function handles changes in the selected level.
  const handleLevelChange = (event) => {
    const { value } = event.target;
    setSelectedLevel(value);
    setLevelError(value === 0);
  };

  // This function handles the addition of a new selection.
  const handleAdd = () => {
    // If both subject and level are selected, a new selection is created and added using the onAdd prop.
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
      // If either subject or level is not selected, an error is set for each and the function returns.
      setSubjectError(!selectedSubject);
      setLevelError(!selectedLevel);
      return;
    }
  };

  // Renders a selection box container with two select elements and an add button
  return (
    <div className={styles.selectionBoxContainer}>
      {/* Select element for choosing subject */}
      <select
        className={`${styles.selectStyles} ${
          subjectError ? styles.error : styles.notError
        }`}
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">직군 경험 선택</option>
        {/* Maps through subjects array to create options */}
        {subjects.map((subject) => (
          <option key={subject.value} value={subject.value}>
            {subject.display}
          </option>
        ))}
      </select>
      {/* Select element for choosing level */}
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
      {/* Button for adding selection */}
      <button onClick={handleAdd} className={styles.addButton}>
        추가
      </button>
    </div>
  );
};

const SelectionBoxList = () => {
  // Importing the useNavigate hook from the react-router-dom library
  const navigate = useNavigate();
  // Initializing the selections state variable as an empty array and creating a function to update it
  const [selections, setSelections] = useState([]);
  // Initializing the selectionErrors state variable as an empty array and creating a function to update it
  const [selectionErrors, setSelectionErrors] = useState([]);

  // An array of objects representing the available subjects to select from
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

  // Function to add a new selection to the selections state variable
  const handleAddSelection = (newSelection) => {
    setSelections([...selections, newSelection]);
  };

  // Function to update an existing selection in the selections state variable
  const handleEditSelection = (index, value) => {
    setSelections((prevSelections) => {
      const updatedSelections = [...prevSelections];
      updatedSelections[index] = { ...updatedSelections[index], ...value };
      return updatedSelections;
    });
  };

  // Function to delete a selection from the selections state variable
  const handleDeleteSelection = (index) => {
    const updatedSelections = selections.filter((_, i) => i !== index);
    setSelections(updatedSelections);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Check if any selections are incomplete
    const hasIncompleteSelection = selections.some(
      (selection) => !selection.level !== !selection.subject
    );

    // If there are incomplete selections, display an alert and return
    if (hasIncompleteSelection) {
      alert("직군 경험 선택 및 횟수를 선택해 주세요!");
      return;
    }

    // Convert the selections into an object and assign it to the data variable
    const data = selections.reduce((acc, { subject, level }) => {
      acc[subject] = level;
      return acc;
    }, {});

    // Get token from local storage
    const token = localStorage.getItem("token");

    // Send a POST request to the API endpoint with the provided data
    fetch(API_URI + "/api/v1/lecture/set2", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        // Include the token in the Authorization header
        Authorization: "Bearer " + token,
        // Set the content type to JSON
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // If the response data has a length greater than 0
        if (data.length > 0) {
          // Navigate to the "/roadmap/favorite" route
          navigate("/roadmap/favorite");
        }
      })
      .catch((error) => console.error(error)); // Log any errors to the console
  };

  // This component renders a list of selection boxes for the user to choose from.
  // It also renders a submit button to submit the selections.
  // It receives the subjects array as a prop and passes it down to the SelectionBox and SelectionTable components.
  // It also receives several functions as props to handle adding, editing, and deleting selections.

  return (
    <div className={styles.container}>
      <div>
        {/* This div contains the text explaining what the user should do */}
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

        {/* This div renders the SelectionBox component */}
        <div>
          <SelectionBox subjects={subjects} onAdd={handleAddSelection} />
        </div>

        {/* This div renders the SelectionTable component if there are any selections */}
        <div>
          {selections.length > 0 && (
            <SelectionTable
              selections={selections}
              subjects={subjects}
              selectionErrors={selectionErrors}
              onEdit={handleEditSelection}
              onDelete={handleDeleteSelection}
              setSelectionErrors={setSelectionErrors}
            />
          )}
        </div>
      </div>

      {/* This div contains the submit button */}
      <div>
        <button className={styles.submitButton} onClick={handleSubmit}>
          제출
        </button>
      </div>
    </div>
  );
};

export default SelectionBoxList;
