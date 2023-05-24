import React, { useEffect, useMemo, useState } from "react";
import styles from "../css/Main.module.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//배너 이미지 삽입
import image1 from "../img/부트캠프.png";
import image2 from "../img/임시배너-001.png";
import image3 from "../img/임시배너-002.png";

//기업 로고 이미지 삽입
import logo1 from "../img/캡처.PNG";
import logo2 from "../img/캡처.PNG";
import logo3 from "../img/캡처.PNG";
import logo4 from "../img/캡처.PNG";
import logo5 from "../img/캡처.PNG";
import logo6 from "../img/캡처.PNG";
import logo7 from "../img/캡처.PNG";
import logo8 from "../img/캡처.PNG";
import logo9 from "../img/캡처.PNG";
import SimpleSlider from "../components/Slider";
import Slider from "react-slick";
import CarouselSlider from "../components/CarouselSlider";

const Main = () => {
  // App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.
  const ranks = ["front", "back", "full", "ios", "vr"];
  const jobKor = useMemo(() => {
    return [
      "서버/백엔드 개발자",
      "프론트엔드 개발자",
      "웹 풀스택 개발자",
      "안드로이드 개발자",
      "IOS 개발자",
      "크로스플랫폼 개발자",
      "게임 클라이언트 개발자",
      "게임 서버 개발자",
      "	DBA",
      "빅데이터 엔지니어",
      "인공지능/머신러닝",
      "devops/시스템 엔지니어",
      "정보보안 담당자",
      "QA 엔지니어",
      "개발 PM",
      "HW/임베디드",
      "SW/솔루션",
      "웹퍼블리셔",
      "VR/AR/3D",
      "블록체인",
      "기술지원",
    ];
  }, []);
  const transName = (id, jobKor) => {
    let name = "";

    switch (id) {
      case "back":
        name = jobKor[0];
        break;
      case "front":
        name = jobKor[1];
        break;
      case "full":
        name = jobKor[2];
        break;
      case "android":
        name = jobKor[3];
        break;
      case "ios":
        name = jobKor[4];
        break;
      case "crossp":
        name = jobKor[5];
        break;
      case "gclient":
        name = jobKor[6];
        break;
      case "gserver":
        name = jobKor[7];
        break;
      case "dba":
        name = jobKor[8];
        break;
      case "bigdata":
        name = jobKor[9];
        break;
      case "ai":
        name = jobKor[10];
        break;
      case "devops":
        name = jobKor[11];
        break;
      case "security":
        name = jobKor[12];
        break;
      case "qa":
        name = jobKor[13];
        break;
      case "pm":
        name = jobKor[14];
        break;
      case "embeded":
        name = jobKor[15];
        break;
      case "solution":
        name = jobKor[16];
        break;
      case "wpublisher":
        name = jobKor[17];
        break;
      case "vr":
        name = jobKor[18];
        break;
      case "blockchain":
        name = jobKor[19];
        break;
      case "support":
        name = jobKor[20];
        break;
      default:
        name = "";
        break;
    }

    return name;
  };

  const [jobName, setJobName] = useState("");

  const [companySilder, setCompanySlider] = useState(null);
  const [bootSilder, setBootSlider] = useState(null);

  let tmp = ranks[1];
  useEffect(() => {
    setJobName(transName(tmp, jobKor));

    const tmpSlider = () => {
      return <SimpleSlider id={tmp} />;
    };

    setCompanySlider(tmpSlider);

    const tmpBoot = () => {
      return <CarouselSlider id={tmp} />;
    };

    setBootSlider(tmpBoot);
  }, [tmp, jobKor]);

  return (
    <div>
      <div className={styles.banner}>
        현재 확인할 수 있는 정보에 대해서 알아볼까요?
      </div>

      <div className={styles["banner-image"]}>{bootSilder}</div>

      <div className={styles.label_1}>
        지금 뜨고 있는 <span>{jobName}</span> 의 공고를 확인해보세요!
      </div>
      <div className={styles.logo}>{companySilder}</div>
    </div>
  );
};

export default Main;
