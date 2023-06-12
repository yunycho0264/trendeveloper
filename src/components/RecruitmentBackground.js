import React, { useState, useEffect } from "react";
import "../css/Navbar.css";

import styles from "../css/RecruitmentList.module.css";

import RecruitmentList from "./RecruitmentList";
const API_URI = process.env.REACT_APP_API_URI;

const RecruitBackground = () => {
  //카테고리 체크박스
  const [jobPostings, setJobPostings] = useState(null); //state for job postings

  const subjects = [
    //array of subjects for checkboxes
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

  let urlSearchParams = new URLSearchParams(window.location.search); //get URL search parameters
  const id = urlSearchParams.get("id"); //get id from URL search parameters
  const tmp = id ? { [id]: true } : {}; //set tmp object based on id

  const [checkboxValues, setCheckboxValues] = useState(tmp); //state for checkbox values

  const handleCheckboxChange = (event) => {
    //function to handle checkbox change
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  //검색
  const [search, setSearch] = useState(""); //state for search term
  const [searchInput, setSearchInput] = useState(""); //state for search input
  const [searchCategory, setSearchCategory] = useState("title"); //state for search category

  const handleSearchInput = (e) => {
    //function to handle search input change
    setSearchInput(e.target.value);
  };

  const handleClickedSearchBtn = () => {
    //function to handle search button click
    setSearch(searchInput);
  };

  const handleClickedResetBtn = () => {
    //function to handle reset button click
    const confirmation = window.confirm(
      "선택된 카테고리와 검색 모두 초기화 하시겠습니까?"
    );

    if (confirmation) {
      setCheckboxValues({});

      setSearch("");
      setSearchInput("");
    }
  };

  const OPTIONS = [
    //array of search options
    { value: "title", name: "공고 제목" },
    { value: "cname", name: "회사명" },
  ];

  const SelectBox = (props) => {
    //function component for select box
    const handleChange = (e) => {
      //function to handle select box change
      setSearchCategory(e.target.value); //set the search category based on the selected value
    };
    return (
      <select
        value={searchCategory} //set the value of the select box to the current search category
        onChange={handleChange} //call the handleChange function when the select box value changes
        className={styles["select-box"]}
      >
        {props.options.map(
          (
            option //map through the options array to create option elements
          ) => (
            <option
              key={option.value} //set the key to the value of the option
              value={option.value} //set the value of the option to the value of the option
              defaultValue={props.defaultValue === option.value} //set the default value of the option to true if it matches the defaultValue prop
              className={styles["select-option"]}
            >
              {option.name}
              {/* display the name of the option */}
            </option>
          )
        )}
      </select>
    );
  };

  // useEffect hook to fetch job postings based on selected checkboxes and search parameters
  useEffect(() => {
    // create new URLSearchParams object
    const queryParams = new URLSearchParams();
    // get an array of selected checkbox ids
    const selectedIds = Object.keys(checkboxValues).filter(
      (key) => checkboxValues[key]
    );
    // if there are selected checkboxes, append their ids to the query parameters
    if (selectedIds.length > 0) {
      const idParam = selectedIds.join(",");
      queryParams.append("id", idParam);
    }
    // if there is a search term, append it to the query parameters based on the selected search category
    if (search) {
      if (searchCategory === "title") {
        queryParams.append("title", search);
      } else if (searchCategory === "cname") {
        queryParams.append("company", search);
      }
    }
    // decode the query parameters and convert to a string
    const queryString = decodeURIComponent(queryParams.toString());

    // define an async function to fetch job postings
    const fetchJobPostings = async () => {
      // construct the API endpoint URL with the query parameters
      const url = `${API_URI}/api/v1/recruitment/list?${queryString}`;

      // make a GET request to the API endpoint
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // parse the response as JSON
      const respJSON = await response.json();

      // set the job postings state with the response data
      setJobPostings(<RecruitmentList post={respJSON} />);
    };

    // call the fetchJobPostings function
    fetchJobPostings();
  }, [checkboxValues, search, searchCategory]); // re-run the effect whenever the checkboxValues, search, or searchCategory state changes

  // This function handles the key press event
  const handleKeyPress = (e) => {
    // If the key pressed is "Enter"
    if (e.key === "Enter") {
      // Call the handleClickedSearchBtn function
      handleClickedSearchBtn();
    }
  };

  return (
    <>
      {/* Render checkboxes for categories */}
      <div className={styles["btn-container"]}>
        {subjects.map((subject) => (
          <div key={subject.value}>
            <input
              type="checkbox"
              id={subject.value}
              name={subject.value}
              checked={checkboxValues[subject.value] || false}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
            <label htmlFor={subject.value} className={styles.btn}>
              {subject.display}
            </label>
          </div>
        ))}
      </div>
      {/* Render search bar */}
      <div className={styles["search-container"]}>
        <SelectBox options={OPTIONS} defaultValue="title" />

        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={handleSearchInput}
          onKeyDown={handleKeyPress} // Added onKeyPress event handler
          className={styles["search-input"]}
        />
        <button
          type="button"
          onClick={handleClickedSearchBtn}
          className={styles["search-button"]}
        >
          검색
        </button>
        <button
          type="button"
          onClick={handleClickedResetBtn}
          className={styles["reset-button"]}
        >
          초기화
        </button>
      </div>
      {/* Render job postings */}
      {jobPostings}
    </>
  );
};

export default RecruitBackground;
