import React from "react"; // Importing React library

import styles from "../css/BootCamp.module.css"; // Importing CSS styles

const BootCampContent = (props) => {
  // Creating a functional component named BootCampContent with props as parameter
  const data = props.data; // Assigning props.data to a constant variable named data

  return (
    // Returning JSX
    <tr key={props.index}>
      {" "}
      {/* Creating a table row with a key prop */}
      <td className={styles.link}>
        {" "}
        {/* Creating a table data cell with a class name */}
        <a href={data.link} target="_blank" rel="noreferrer">
          {" "}
          {/* Creating an anchor tag with a link, target and rel attribute */}
          {data.title} {/* Displaying the title */}
        </a>
      </td>
      <td style={{ textAlign: "center" }}>{data.due}</td>{" "}
      {/* Creating a table data cell with inline style */}
      <td style={{ textAlign: "center" }}>{data.st}</td>{" "}
      {/* Creating a table data cell with inline style */}
      <td style={{ textAlign: "center" }}>{data.fin}</td>{" "}
      {/* Creating a table data cell with inline style */}
    </tr>
  );
};

export default BootCampContent; // Exporting the BootCampContent component as default.
