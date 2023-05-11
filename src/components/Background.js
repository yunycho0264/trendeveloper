import React from "react";
import styles from "../css/Background.module.css";

const Background = () => {
  return (
    <div className={styles.Background}>
      <div className={styles["above-rectangle"]} />
      <div className={styles["below-rectangle"]} />
    </div>
  );
};

export default Background;
