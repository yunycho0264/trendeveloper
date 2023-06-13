import React, { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import styled from "styled-components";

export const ModalContainer = styled.span`
  // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  position: relative;
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
  margin-top: 4vh;
  margin-left: 2vw;
`;

export const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ModalBtn = styled.button`
  background-color: var(--coz-purple-600);
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ExitBtn = styled(ModalBtn)`
  background-color: #ba0c2f;
  border-radius: 10px;
  text-decoration: none;
  margin: 10px;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  position: relative;
  left: 350px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 800px;
  height: 700px;
  background-color: #ffffff;

  > div.desc {
    margin: 30px 50px;
    font-size: 15px;
    color: black;
    h3 {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 20px;
    }

    h4 {
      font-size: 20px;
      font-weight: bold;
      margin: 20px 0;
    }

    p {
      margin: 5px 0;
    }

    ul {
      padding: 0;
      margin-left: 20px;
    }

    .hilight {
      color: #ba0c2f;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const HowRank = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <span>
      &nbsp;
      <AiFillQuestionCircle onClick={openModalHandler} />
      {/*{isHovered && <p>Text to appear on hover</p>}*/}
      {isOpen && (
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={(e) => e.stopPropagation()}>
            <ExitBtn onClick={openModalHandler}>x</ExitBtn>
            <div className="desc">
              <h3>[점수 환산 방식]</h3>
              <p style={{ height: "20px" }} />
              100 = 70 (평점 가중 평균) + 15 (수강 강의 수) + 15 (기술 활용
              경험)
              <p style={{ height: "20px" }} />
              <h4>평점 가중 평균</h4>
              <p />
              세 가지 항목을 기준으로 가중치 계산.
              <p style={{ height: "10px" }} />
              <ul>
                <li>
                  기본 점수 ( +10 ) : 직군과 과목이 기본적으로 연관이 되어있는가
                </li>{" "}
                <li>
                  핵심 지식 ( +5 ) : 과목이 직군에 직접 적용할 수 있는 기본
                  개념과 원칙을 제공하는지
                </li>
                <li>
                  {" "}
                  실용 기술 ( +5 ) : 과목이 직군에 필요한 실용 기술을 학생들에게
                  제공하는가
                </li>
              </ul>
              <p style={{ height: "20px" }} />
              <h4>수강 강의 수</h4>
              <p />
              과목 수에 따라 15점 만점으로 환산 (수강 과목 6개 이상 15점 만점
              처리)
              <p style={{ height: "20px" }} />
              <h4>기술 활용 경험</h4>
              <p />
              경험 1회 당 5점, 15점 만점으로 환산 (경험 3회 이상 15점 만점 처리)
            </div>
          </ModalView>
        </ModalBackdrop>
      )}
    </span>
  );
};

export default HowRank;
