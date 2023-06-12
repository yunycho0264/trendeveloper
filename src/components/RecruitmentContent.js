import { useEffect, useState } from "react"; // Importing necessary modules from react library
import { Link } from "react-router-dom"; // Importing necessary modules from react-router-dom library

import { BiCircle, BiX } from "react-icons/bi"; // Importing necessary icons from react-icons library
import styles from "../css/RecruitmentList.module.css"; // Importing necessary styles from RecruitmentList.module.css file

const API_URI = process.env.REACT_APP_API_URI; // Assigning API_URI value from environment variables

const RecruitContent = (props) => {
  // Creating a functional component named RecruitContent with props parameter
  const [companyInfo, setCompanyInfo] = useState({}); // Creating a state variable named companyInfo and its setter function with initial value as an empty object
  const [closeDtInfo, setCloseDtInfo] = useState({}); // Creating a state variable named closeDtInfo and its setter function with initial value as an empty object

  useEffect(() => {
    // Using useEffect hook to perform side effect
    const recruitmentID = props.id; // Assigning props.id value to recruitmentID variable
    const fetchCompanyInfo = async () => {
      // Creating an asynchronous function named fetchCompanyInfo
      try {
        // Using try-catch block to handle errors
        const response = await fetch(
          // Assigning fetch response to response variable
          `${API_URI}/api/v1/recruitment/detail?id=${recruitmentID}`, // Fetching data from API endpoint with recruitmentID parameter
          {
            method: "GET", // Using GET method to fetch data
            headers: {
              "Content-Type": "application/json", // Setting content type as application/json
            },
          }
        );
        const respJSON = await response.json(); // Parsing response data to JSON format and assigning it to respJSON variable
        const closeDtSrc = respJSON.closeDt; // Assigning respJSON.closeDt value to closeDtSrc variable
        let closeDtInfoTmp = {}; // Creating a temporary object named closeDtInfoTmp
        if (closeDtSrc.length > 0) {
          // Checking if closeDtSrc length is greater than 0
          const closeDtArr = closeDtSrc.split("  "); // Splitting closeDtSrc value by double space and assigning it to closeDtArr variable
          if (closeDtArr.length === 1) {
            // Checking if closeDtArr length is equal to 1
            closeDtInfoTmp.date = closeDtArr[0]; // Assigning closeDtArr[0] value to closeDtInfoTmp.date
            closeDtInfoTmp.until = // Assigning a JSX element to closeDtInfoTmp.until
              (
                <>
                  <BiX size="30px" color="#E00000" />
                  {/* Using BiX icon with size and color properties */}
                </>
              );
          } else {
            // If closeDtArr length is not equal to 1
            closeDtInfoTmp.date = closeDtArr[1]; // Assigning closeDtArr[1] value to closeDtInfoTmp.date
            closeDtInfoTmp.until = // Assigning a JSX element to closeDtInfoTmp.until
              (
                <>
                  <BiCircle size="20px" color="#008000" />
                  {/* Using BiCircle icon with size and color properties */}
                </>
              );
          }
        }
        setCompanyInfo(respJSON); // Setting respJSON value to companyInfo state variable
        setCloseDtInfo(closeDtInfoTmp); // Setting closeDtInfoTmp value to closeDtInfo state variable
      } catch (error) {
        // Handling errors
        console.error(error); // Logging error to console
      }
    };
    fetchCompanyInfo(); // Calling fetchCompanyInfo function
  }, []); // Running useEffect hook only once when component mounts

  return (
    // Returning JSX
    <tr key={props.index}>
      {/* Creating a table row with key attribute */}
      <td>{companyInfo.companyName}</td>
      {/* Creating a table data cell with companyInfo.companyName value */}
      <td className={styles.link}>
        {/* Creating a table data cell with className attribute */}
        <Link to={`/recruitement/detail?id=${companyInfo.wantedAuthNo}`}>
          {/* Creating a Link component with to attribute */}
          {companyInfo.wantedTitle}
          {/* Displaying companyInfo.wantedTitle value */}
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>{closeDtInfo.date}</td>
      {/* Creating a table data cell with textAlign and closeDtInfo.date properties */}
      <td style={{ textAlign: "center" }}>{closeDtInfo.until}</td>
      {/* Creating a table data cell with textAlign and closeDtInfo.until properties */}
    </tr>
  );
};

export default RecruitContent; // Exporting RecruitContent component as default
