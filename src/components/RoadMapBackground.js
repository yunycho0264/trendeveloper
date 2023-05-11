import React, { useState } from "react";
import styles from "../css/RoadMap.module.css";
import "../css/Navbar.css";

import SimpleSlider from "./Slider";
import ApexCharts from "./charts";

import { AiFillQuestionCircle } from "react-icons/ai";

import Modal from "react-modal";

const RoadMapBackground = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className={`${styles["clicked-job"]} ${styles.text}`}>
            파워레인저
          </span>{" "}
          님의 로드맵
          <span>
            <AiFillQuestionCircle />
            <Modal isOpen={false}> </Modal>
          </span>
        </div>
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

export default RoadMapBackground;
