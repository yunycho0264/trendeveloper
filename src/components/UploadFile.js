import React, { useState } from "react"; // Importing necessary modules
import SelectionBoxList from "./SelectionBoxList.js"; // Importing SelectionBoxList component
// import SelectionBoxList from "./SelectionBoxList.js";
const API_URI = process.env.REACT_APP_API_URI; // Assigning API_URI from environment variables

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null); // Initializing selectedFile state with null
  const [selectPage, setSelectPage] = useState(null); // Initializing selectPage state with null

  const handleFileUpload = (event) => {
    // Function to handle file upload
    var XLSX = require("xlsx"); // Requiring XLSX library
    const file = event.target.files[0]; // Getting the uploaded file
    const reader = new FileReader(); // Creating a new FileReader object

    reader.onload = function (e) {
      // Function to handle file reading
      const data = new Uint8Array(e.target.result); // Getting the file data
      const workbook = XLSX.read(data, { type: "array" }); // Reading the workbook from the file data
      const sheetName = workbook.SheetNames[0]; // Getting the name of the first sheet
      const sheet = workbook.Sheets[sheetName]; // Getting the first sheet
      const lecJSON = XLSX.utils.sheet_to_json(sheet); // Converting the sheet to JSON
      var lectures = {}; // Initializing lectures object

      lecJSON.forEach((elem) => {
        // Looping through each element in the JSON
        if (elem.hasOwnProperty("__EMPTY_2")) {
          // Checking if the element has the property "__EMPTY_2"
          var code = elem["__EMPTY_2"]; // Getting the value of "__EMPTY_2"
          if (!isNaN(parseFloat(code)) && isFinite(code)) {
            // Checking if the value of "__EMPTY_2" is a number
            lectures[code] = elem["__EMPTY_10"]; // Adding the lecture to the lectures object
          }
        }
      });

      setSelectedFile(file); // Setting the selected file

      const token = localStorage.getItem("token"); // Getting the token from local storage
      fetch(API_URI + "/api/v1/lecture/set", {
        // Sending a POST request to the API
        method: "POST",
        body: JSON.stringify(lectures), // Sending the lectures object as the request body
        headers: {
          Authorization: "Bearer " + token, // Adding the token to the request headers
          "Content-Type": "application/json", // Setting the content type to JSON
        },
      })
        .then((response) => response.json()) // Parsing the response as JSON
        .then((data) => {
          console.log(data); // Logging the response data
          if (data.length > 0) {
            // Checking if the response data has a length greater than 0
            setSelectPage(<SelectionBoxList />); // Setting the selectPage state to the SelectionBoxList component
          }
        })
        .catch((error) => console.error(error)); // Catching any errors and logging them
    };

    reader.readAsArrayBuffer(file); // Reading the file as an array buffer
  };

  const styles = {
    // Styling object
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
        {/*Displaying the selected file name or a message if no file is selected */}
        {selectedFile
          ? `Selected file: ${selectedFile.name}`
          : "No file selected"}
      </div>
      <form>
        <input
          type="file"
          id="upload-input" // Adding id attribute
          onChange={handleFileUpload} // Calling handleFileUpload function on file upload
          accept=".xlsx, .xls" // Accepting only .xlsx and .xls files
          style={{
            position: "absolute",
            left: "-9999px",
          }}
        />
        <label htmlFor="upload-input" style={styles.uploadButton}>
          {/*Displaying the upload button */}
          파일 업로드
        </label>
      </form>
      <div style={{ marginTop: "20px", alignItems: "center" }}>
        {/*Displaying the selectPage component */}
        {selectPage}
      </div>
    </div>
  );
};

export default UploadFile; // Exporting the UploadFile component
