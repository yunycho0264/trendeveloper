import React from "react";
import styles from "../css/MyPage.module.css";
import "../css/Navbar.css";
import SimpleSlider from "./Slider";

import { BsFillGearFill } from "react-icons/bs";
const MyPageBackground = () => {
  return (
    <div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className={`${styles["clicked-job"]}`}>파워레인저 </span>
          님의 관심직무
        </div>
        <div className={`${styles.box} ${styles.leftbox} ${styles.text}`}></div>
      </div>

      <div className={styles.contents}>
        <div className={`${styles.next} ${styles.text}`}>
          추천하는
          <span className={`${styles["clicked-job"]}`}>직무</span>
        </div>
        <div
          className={`${styles.box} ${styles.rightbox} ${styles.text}`}
        ></div>
      </div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>
          <span className={`${styles["clicked-job"]}`}>파워레인저 </span>
          님의 관심 스택
        </div>
        <div className={`${styles.box} ${styles.leftbox} ${styles.text}`}>
          <ol className="list">
            <li>풀스택</li>
          </ol>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={`${styles.next} ${styles.text}`}>
          <span className={`${styles["clicked-job"]}`}>파워레인저 </span>
          님께서 관심 가질 만한 정보
        </div>
        <div className={`${styles.box} ${styles.rightbox} ${styles.text}`}>
          <SimpleSlider />
        </div>
      </div>
      <div className={styles.contents}>
        <div className={`${styles["sub-text"]} ${styles.text}`}>정보 수정</div>
        <div className={`${styles.box} ${styles.leftbox} ${styles.text}`}></div>
      </div>
      <div className={`${styles.contents}`}>
        <div className={`${styles.next} ${styles.text}`}>
          설정
          <span>
            <BsFillGearFill />
          </span>
        </div>
        <div className={`${styles.box} ${styles.rightbox}`}>
          <ul className={`${styles["inner-text"]}`}>
            <li>[공고]가 올라왔습니다!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPageBackground;
