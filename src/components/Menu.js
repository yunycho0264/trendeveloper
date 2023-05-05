import React, { useState, useContext } from "react";
import styles from "../css/Menu.module.css";
import { AuthContext } from "../context/Auth.context.js";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className={styles.Menu}>
      {/* 홈페이지 로고 */}
      <header>
        <Link to="/">
          TREN<span className={styles.highlight}>D</span>EVELOPER
        </Link>
      </header>
      {/* 메뉴 태그 */}
      <ul className={styles.group}>
        <li className={styles.tag}>
          <Link to="/detail" className={styles.nav} id="nav1">
            채용 공고
          </Link>
        </li>
        <li className={styles.tag}>
          <Link to="/trend" className={styles.nav} id="nav2">
            트렌드
          </Link>
        </li>
        <li className={styles.tag}>
          <Link to="/roadmap" className={styles.nav} id="nav3">
            로드맵
          </Link>
        </li>
      </ul>
      {/* 메뉴 밑 구분선 */}
      <div className={styles["menu-line"]} />
    </div>
  );
};

export default Menu;
