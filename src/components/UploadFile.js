import * as XLSX from "xlsx/xlsx.mjs";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Auth.context.js";

const API_URI = process.env.REACT_APP_API_URI;

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

      const token = localStorage.getItem("token");
      console.log(token);

      fetch(API_URI + "/api/v1/lecture", {
        method: "POST",
        body: JSON.stringify(lectures),
        headers: {
          Authorization: "Bearer " + token,
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
