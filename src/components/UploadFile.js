import * as XLSX from "xlsx/xlsx.mjs";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/Auth.context.js";
import { useNavigate } from "react-router-dom";
import SelectionBoxList from "./SelectionBoxList.js";
// import SelectionBoxList from "./SelectionBoxList.js";
const API_URI = process.env.REACT_APP_API_URI;

const UploadFile = () => {
  const { changeSubmitted } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectPage, setSelectPage] = useState(null);

  const handleFileUpload = (event) => {
    var XLSX = require("xlsx");
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const lecJSON = XLSX.utils.sheet_to_json(sheet);
      var lectures = {};

      lecJSON.forEach((elem) => {
        if (elem.hasOwnProperty("__EMPTY_2")) {
          var code = elem["__EMPTY_2"];
          if (!isNaN(parseFloat(code)) && isFinite(code)) {
            // console.log(elem["__EMPTY_2"] + " : " + elem["__EMPTY_10"]);
            lectures[code] = elem["__EMPTY_10"];
          }
        }
      });

      setSelectedFile(file);

      const token = localStorage.getItem("token");
      // console.log(token);
      fetch(API_URI + "/api/v1/lecture/set", {
        method: "POST",
        body: JSON.stringify(lectures),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            setSelectPage(<SelectionBoxList />);
          }
        })
        .catch((error) => console.error(error));
    };

    reader.readAsArrayBuffer(file);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    fileLabel: {
      marginTop: "10vh",
      marginBottom: "10px",
    },
    uploadButton: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: selectPage ? "#d9d9d9" : "#ba0c2f",
      color: "#fff",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      pointerEvents: selectedFile ? "none" : "auto",
      opacity: selectedFile ? 0.5 : 1,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.fileLabel}>
        {selectedFile
          ? `Selected file: ${selectedFile.name}`
          : "No file selected"}
      </div>
      <form>
        <input
          type="file"
          id="upload-input" // 추가: id 속성 추가
          onChange={handleFileUpload}
          accept=".xlsx, .xls"
          style={{
            position: "absolute",
            left: "-9999px",
          }}
        />
        <label htmlFor="upload-input" style={styles.uploadButton}>
          파일 업로드
        </label>
      </form>
      <div style={{ marginTop: "20px", alignItems: "center" }}>
        {selectPage}
      </div>
    </div>
  );
};

export default UploadFile;
