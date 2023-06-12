import React from "react";
import styles from "../css/Menu.module.css";
import { Link } from "react-router-dom";
import Sign from "./Sign";

const Menu = () => {
  return (
    <div className={styles.Menu}>
      {/* Homepage logo */}
      <header>
        <Link to="/">
          TREN<span className={styles.highlight}>D</span>EVELOPER
        </Link>
      </header>
      {/* Menu tags */}
      <ul className={styles.group}>
        {/* Recruitment list */}
        <li className={styles.tag}>
          <Link to="/recruitement/list" className={styles.nav} id="nav1">
            채용 공고
          </Link>
        </li>
        {/* Trend statistics */}
        <li className={styles.tag}>
          <Link to="/trend/stat" className={styles.nav} id="nav2">
            트렌드
          </Link>
        </li>
        {/* Job recommendation */}
        <li className={styles.tag}>
          <Link to="/roadmap/stat" className={styles.nav} id="nav3">
            직군 추천
          </Link>
        </li>
      </ul>
      {/* Sign component */}
      <Sign />

      {/* Menu line separator */}
      <div className={styles["menu-line"]} />
    </div>
  );
};

export default Menu;
