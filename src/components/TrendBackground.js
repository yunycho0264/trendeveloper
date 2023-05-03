import React from "react";
import styles from "../css/Box.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexCharts from "./charts";

const TrendBackground = () => {
  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className="title s-title ">
            TREN<span>D</span>EVELOPER
          </span>
          에 선정한 요즘 뜨는 TOP 5 직군이에요!
        </div>
        <div className={`${styles.box} ${styles.rank} ${styles.text}`}>
          <ol className="list">
            <li>풀스택</li>
          </ol>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={`${styles.next} ${styles.text}`}>
          직군 트렌드 순위는 어떻게 산정할까요?
        </div>
        <div className={`${styles.box} ${styles.how}`}></div>
      </div>
      {/* 클릭한 직업 */}
      <div className={`${styles.background} ${styles.box}`}>
        <div className={styles.contents}>
          <div className={`${styles.text} ${styles["inner-text"]} `}>
            <span className={`${styles["clicked-job"]} ${styles.text}`}>
              풀스택 개발자
            </span>{" "}
            의 과거 6개월 간 채용 동향이에요!
          </div>
          <div className={`${styles.box} ${styles["inner-box"]}`}>
            <ApexCharts />
          </div>
        </div>
        <div className={styles.contents}>
          <div className={`${styles.text} ${styles["inner-text"]} `}>
            <span className={`${styles["clicked-job"]} ${styles.text}`}>
              풀스택 개발자
            </span>{" "}
            와 다른 직군의 뉴스 언급도를 비교해볼까요?
          </div>
          <div className={`${styles.box} ${styles["inner-box"]}`}>
            <ApexCharts />
          </div>
        </div>
        <div className={styles.contents}>
          <div className={`${styles.text} ${styles["inner-text"]} `}>
            <span className={`${styles["clicked-job"]} ${styles.text}`}>
              풀스택 개발자
            </span>{" "}
            와 관련된 다른 공고도 확인해볼까요?
          </div>
          <div className={`${styles.box} ${styles["inner-box"]}`}>
            <SimpleSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendBackground;
