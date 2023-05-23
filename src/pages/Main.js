import React from "react";
import styles from "../css/Main.module.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


//배너 이미지 삽입
import image1 from '../img/부트캠프.png';
import image2 from '../img/임시배너-001.png';
import image3 from '../img/임시배너-002.png';

//기업 로고 이미지 삽입
import logo1 from '../img/캡처.PNG';
import logo2 from '../img/캡처.PNG';
import logo3 from '../img/캡처.PNG';
import logo4 from '../img/캡처.PNG';
import logo5 from '../img/캡처.PNG';
import logo6 from '../img/캡처.PNG';
import logo7 from '../img/캡처.PNG';
import logo8 from '../img/캡처.PNG';
import logo9 from '../img/캡처.PNG';

const Main = () => {
  // App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.

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
        지금 뜨고 있는 <span>프론트엔드 개발자</span> 의 공고를 확인해보세요!
      </div>

      <div className={styles.logo}>
        <div style={{ display: 'flex', overflowX: 'auto', width: '1100px', height: '200px' }}>
          <a href="https://url-to-job1.com"><img src={logo1} alt="Logo 1" style={{ width: '300px', height: '200px', margin: '0 20px',  border: '1px solid #89969f'}} /></a>
          <a href="https://url-to-job2.com"><img src={logo2} alt="Logo 2" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f'}} /></a>
          <a href="https://url-to-job3.com"><img src={logo3} alt="Logo 3" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f' }} /></a>
          <a href="https://url-to-job4.com"><img src={logo4} alt="Logo 4" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f' }} /></a>
          <a href="https://url-to-job5.com"><img src={logo5} alt="Logo 5" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f' }} /></a>
          <a href="https://url-to-job6.com"><img src={logo6} alt="Logo 6" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f' }} /></a>
          <a href="https://url-to-job7.com"><img src={logo7} alt="Logo 7" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f' }} /></a>
          <a href="https://url-to-job8.com"><img src={logo8} alt="Logo 8" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f'}} /></a>
          <a href="https://url-to-job9.com"><img src={logo9} alt="Logo 9" style={{ width: '300px', height: '200px', margin: '0 20px', border: '1px solid #89969f'}} /></a>
        </div>
      </div>


    </div>
  );
};

export default Main;
