// Importing necessary modules
import React, { createContext } from "react";

// Creating a context object
export const ComContext = createContext();

// Creating a provider component
export const ComContextProvider = ({ children }) => {
  // Defining an array of job titles in Korean
  const jobKor = [
    "서버/백엔드 개발자",
    "프론트엔드 개발자",
    "웹 풀스택 개발자",
    "안드로이드 개발자",
    "IOS 개발자",
    "크로스플랫폼 개발자",
    "게임 클라이언트 개발자",
    "게임 서버 개발자",
    "DBA",
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

  // Function to translate job title id to Korean
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

  // Returning the provider component with the context value and children components
  return (
    <ComContext.Provider
      value={{
        jobKor,
        transName,
      }}
    >
      {children}
    </ComContext.Provider>
  );
};
