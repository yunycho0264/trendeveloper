import React, { useState, useEffect } from "react";
import styles from "../css/RoadMap.module.css";
import "../css/Navbar.css";
import UploadFile from "./UploadFile";

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
    <div className={styles.background}>
      <div className={styles.label1}>추천 직무</div>
      <div className={styles['inner-box1']}>
        <div className={styles.rank1}>1. </div>
        <div className={styles.rank2}>2. </div>
        <div className={styles.rank3}>3. </div>
      </div>
      <div className={styles.label2}><span>파워레인저</span> 님의 상위 직군 역량</div>  
      <div className={styles['inner-box2']} />
      <div className={styles.label3}><span>풀스택 개발자</span> 와 관련 있는 공고에요!</div>  
      <div className={styles['inner-box3']} />
    </div>
    </div>
  );
};

export default RoadMapBackground;
