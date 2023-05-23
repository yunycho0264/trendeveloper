import React, { useState } from "react";
import { Link } from "react-router-dom";
import RoadMap from "../pages/RoadMap";

const SelectionBoxList = () => {
  const [selections, setSelections] = useState([]);
  const subjects = ["Math", "Science", "English"]; // Sample subjects list

  const handleAddSelection = () => {
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

  return (
    <>
      {" "}
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
      </div>{" "}
      <Link to={"/roadmap"}>submit</Link>
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
    const selection = {
      subject: selectedSubject,
      level: selectedLevel,
    };
    onUpdate(index, selection);
  };

  return (
    <div>
      <select value={selectedSubject} onChange={handleSubjectChange}>
        <option value="">Select a subject</option>
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      <label>
        <input
          type="radio"
          value="upper"
          checked={selectedLevel === "upper"}
          onChange={handleLevelChange}
        />
        Upper
      </label>
      <label>
        <input
          type="radio"
          value="middle"
          checked={selectedLevel === "middle"}
          onChange={handleLevelChange}
        />
        Middle
      </label>
      <label>
        <input
          type="radio"
          value="lower"
          checked={selectedLevel === "lower"}
          onChange={handleLevelChange}
        />
        Lower
      </label>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
