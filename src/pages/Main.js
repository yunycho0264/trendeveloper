import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "../css/Main.module.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//배너 이미지 삽입
import image1 from "../img/앱서비스.png";
import image2 from "../img/Cloud.png";
import image3 from "../img/임시배너-002.png";

//기업 로고 이미지 삽입
import SimpleSlider from "../components/Slider";
import Slider from "react-slick";
import CarouselSlider from "../components/BootCamp";
import { ComContext } from "../context/Com.context";

const Main = () => {
  // App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.
  const { jobKor, transName } = useContext(ComContext);

  const ranks = ["front", "back", "full", "ios", "vr"];

  const [jobName, setJobName] = useState("");

  const [companySilder, setCompanySlider] = useState(null);

  let tmp = ranks[1];
  useEffect(() => {
    setJobName(transName(tmp, jobKor));

    const tmpSlider = () => {
      return <SimpleSlider id={tmp} />;
    };

    setCompanySlider(tmpSlider);
  }, [tmp, jobKor]);

  return (
    <div>
      <div className={styles.banner}>
        현재 확인할 수 있는 정보에 대해서 알아볼까요?
      </div>

      <div className={styles["banner-image"]}>
        <Carousel autoPlay interval={5000} infiniteLoop>
          <div>
            <img src={image1} alt="Slide 1" />
          </div>
          <div>
            <img src={image2} alt="Slide 2" />
          </div>
          <div>
            <img src={image3} alt="Slide 3" />
          </div>
        </Carousel>
      </div>
      <div className={styles.label_1}>
        지금 뜨고 있는 <span>{jobName}</span> 의 공고를 확인해보세요!
      </div>
      <div className={styles.logo}>{companySilder}</div>
    </div>
  );
};

export default Main;
