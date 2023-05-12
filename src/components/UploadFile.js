import * as XLSX from "xlsx/xlsx.mjs";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context.js";

const UploadFile = () => {
  const { changeSubmitted } = useContext(AuthContext);
  const handleFileUpload = (event) => {
    var XLSX = require("xlsx");
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      console.log(jsonData);

      // 파일 업로드 요청 보내기
      fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    };

    reader.readAsArrayBuffer(file);
    changeSubmitted();
  };

  return (
    <form>
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
    </form>
  );
};

export default UploadFile;
