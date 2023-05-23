import React, { useState, useEffect, useMemo } from "react";
import "../css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "../css/RecruitmentList.module.css";

import RecruitmentList from "./RecruitmentList";
const API_URI = process.env.REACT_APP_API_URI;

const RecruitBackground = () => {
  //카테고리 체크박스

  const [jobPostings, setJobPostings] = useState(null);

  const subjects = [
    { display: "서버/백엔드 개발자", value: "back" },
    { display: "프론트엔드 개발자", value: "front" },
    { display: "웹 풀스택 개발자", value: "full" },
    { display: "안드로이드 개발자", value: "android" },
    { display: "IOS 개발자", value: "ios" },
    { display: "크로스플랫폼 개발자", value: "crossp" },
    { display: "게임 클라이언트 개발자", value: "gclient" },
    { display: "게임 서버 개발자", value: "gserver" },
    { display: "DBA", value: "dba" },
    { display: "빅데이터 엔지니어", value: "bigdata" },
    { display: "인공지능/머신러닝", value: "ai" },
    { display: "devops/시스템 엔지니어", value: "devops" },
    { display: "정보보안 담당자", value: "security" },
    { display: "QA 엔지니어", value: "qa" },
    { display: "개발 PM", value: "pm" },
    { display: "HW/임베디드", value: "embeded" },
    { display: "SW/솔루션", value: "solution" },
    { display: "웹퍼블리셔", value: "wpublisher" },
    { display: "VR/AR/3D", value: "vr" },
    { display: "블록체인", value: "blockchain" },
    { display: "기술지원", value: "support" },
  ];
  const [checkboxValues, setCheckboxValues] = useState({});
  const [selectedCheckboxString, setSelectedCheckboxString] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  //검색
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("title");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    // console.log(searchInput);
  };

  const handleClickedSearchBtn = () => {
    console.log("clicked:", searchInput);
    setSearch(searchInput);
  };

  const handleClickedResetBtn = () => {
    // console.log("clicked:", searchInput);
    setSearch("");
    setSearchInput("");
  };

  const OPTIONS = [
    { value: "title", name: "공고 제목" },
    { value: "cname", name: "회사명" },
  ];

  const SelectBox = (props) => {
    const handleChange = (e) => {
      console.log(e.target.value);
      setSearchCategory(e.target.value);
    };

    return (
      <select value={searchCategory} onChange={handleChange}>
        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            defaultValue={props.defaultValue === option.value}
          >
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  useEffect(() => {
    console.log(selectedCheckboxString);

    const string = Object.keys(checkboxValues)
      .filter((key) => checkboxValues[key])
      .map((key) => subjects.find((subject) => subject.value === key).display)
      .join(", ");

    setSelectedCheckboxString(string);

    console.log(searchCategory);

    const queryParams = new URLSearchParams();
    const selectedIds = Object.keys(checkboxValues).filter(
      (key) => checkboxValues[key]
    );
    if (selectedIds.length > 0) {
      const idParam = selectedIds.join(",");
      queryParams.append("id", idParam);
    }
    if (search) {
      if (searchCategory === "title") {
        queryParams.append("title", search);
      } else if (searchCategory === "cname") {
        queryParams.append("company", search);
      }
    }

    // console.log(decodeURIComponent(queryParams.toString()));

    const fetchJobPostings = async () => {
      // const url = `${API_URI}/api/v1/recruitment/list?${decodeURIComponent(
      //   queryParams.toString()
      // )}`;
      const url = `${API_URI}/api/v1/recruitment/list`;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const respJSON = await response.json();

      console.log(respJSON);
      setJobPostings(<RecruitmentList post={respJSON} />);
    };

    fetchJobPostings();
  }, [checkboxValues, search, searchCategory]);

  return (
    <>
      {/* Render checkboxes for categories */}
      <div>
        {subjects.map((subject) => (
          <label key={subject.value}>
            <input
              type="checkbox"
              name={subject.value}
              checked={checkboxValues[subject.value] || false}
              onChange={handleCheckboxChange}
            />
            {subject.display}
          </label>
        ))}
      </div>
      {/* Display selected checkbox string */}
      <p>Selected Categories: {selectedCheckboxString}</p>
      <SelectBox options={OPTIONS} defaultValue="title" />
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={handleSearchInput}
      ></input>{" "}
      <button type="button" onClick={handleClickedSearchBtn}>
        검색
      </button>{" "}
      <button type="button" onClick={handleClickedResetBtn}>
        초기화
      </button>
      {jobPostings}
    </>
  );
};

export default RecruitBackground;
