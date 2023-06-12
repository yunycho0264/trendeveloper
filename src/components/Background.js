import React from "react"; // Importing React library

import styles from "../css/Background.module.css"; // Importing styles from Background.module.css file

const Background = () => {
  // Creating a functional component named Background
  return (
    <div className={styles.Background}>
      {/* Creating a div with class name Background */}
      <div className={styles["above-rectangle"]} />{" "}
      {/* Creating a div with class name above-rectangle */}
      <div className={styles["below-rectangle"]} />{" "}
      {/* Creating a div with class name below-rectangle */}
    </div>
  );
};

export default Background; // Exporting Background component as default.
