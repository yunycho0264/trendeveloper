// Import necessary modules and styles
import React, { useContext, useEffect, useState } from "react";
import styles from "../css/Main.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "../img/앱서비스.png";
import image2 from "../img/Cloud.png";
import image3 from "../img/공공데이터.png";
import SimpleSlider from "../components/Slider";
import { ComContext } from "../context/Com.context";

const Main = () => {
  // Get jobKor and transName from ComContext
  const { jobKor, transName } = useContext(ComContext);

  // Define ranks array
  const ranks = ["front", "back", "full", "ios", "vr"];

  // Define jobName and companySlider states
  const [jobName, setJobName] = useState("");
  const [companySilder, setCompanySlider] = useState(null);

  // Set tmp to ranks[1] and update jobName and companySlider states
  let tmp = ranks[1];
  useEffect(() => {
    // Translate job name to Korean
    setJobName(transName(tmp, jobKor));

    // Set companySlider to SimpleSlider component with id=tmp
    const tmpSlider = () => {
      return <SimpleSlider id={tmp} />;
    };
    setCompanySlider(tmpSlider);
  }, [tmp, jobKor]);

  return (
    <div>
      {/* Banner */}
      <div className={styles.banner}>
        현재 확인할 수 있는 정보에 대해서 알아볼까요?{" "}
        {/* Display banner text */}
      </div>
      {/* Banner images */}
      <div className={styles["banner-image"]}>
        <Carousel autoPlay interval={5000} infiniteLoop>
          {" "}
          {/* Display banner images */}
          <div>
            <a href="http://obigo.com/promotion/?vid=2" target="_blank">
              <img src={image1} alt="Slide 1" />
            </a>
          </div>
          <div>
            <a href="https://ncamp.kr/" target="_blank">
              <img src={image2} alt="Slide 2" />
            </a>
          </div>
          <div>
            <a
              href="https://data.seoul.go.kr/together/notice/boardView.do?seq=4eab5b7659157836591d1ac6cb966b63&pageIndex=1#none"
              target="_blank"
            >
              <img src={image3} alt="Slide 3" />
            </a>
          </div>
        </Carousel>
      </div>
      {/* Job label */}
      <div className={styles.label_1}>
        지금 뜨고 있는 <span>{jobName}</span> 의 공고를 확인해보세요!{" "}
        {/* Display job label */}
      </div>
      {/* Company logos */}
      <div className={styles.logo}>{companySilder}</div>{" "}
      {/* Display company logos */}
    </div>
  );
};

export default Main;
