import React from "react";
import styles from "../css/Menu.module.css";

const Menu = () => {
  return (
    <div className={styles.Menu}>
       {/* 홈페이지 로고 */}
      <header>
        <a href="https://google.com">
          TREN<span className={styles.highlight}>D</span>EVELOPER
        </a>
      </header>
       {/* 메뉴 태그 */}
      <ul className={styles.group}>
        <li className={styles.tag}>
          <a href="https://www.naver.com/" className={styles.nav} id="nav1">
            채용 공고
          </a>
        </li>
        <li className={styles.tag}>
          <a href="https://www.naver.com/" className={styles.nav} id="nav2">
            트렌드
          </a>
        </li>
        <li className={styles.tag}>
          <a href="https://www.naver.com/" className={styles.nav} id="nav3">
            로드맵
          </a>
        </li>
      </ul>
      {/* 메뉴 밑 구분선 */}
      <div className={styles['menu-line']}/>
    </div>
  );
};

export default Menu;
