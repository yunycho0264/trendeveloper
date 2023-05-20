import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Recruitment from "../pages/RecruitmentPage";

import RecruitContent from "./RecruitmentContent";
// import Pagination from "./Pagination";

import ReactPaginate from "react-paginate";

import "../css/RecruitmentList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const RecruitmentList = () => {
  //전체 리스트
  const [jobPostings, setJobPostings] = useState([]);

  // 페이지네이션
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + postsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = jobPostings.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jobPostings.length / postsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * postsPerPage) % jobPostings.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  //검색
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    // console.log(searchInput);
  };

  const handleClickedSearchBtn = () => {
    // console.log("clicked:", searchInput);
    setSearch(searchInput);
  };

  const handleClickedResetBtn = () => {
    // console.log("clicked:", searchInput);
    setSearch("");
    setSearchInput("");
  };

  const [isSearched, setIsSearched] = useState(true);

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
    const fetchJobPostings = async () => {
      // const token = localStorage.getItem('token');

      const response = await fetch(API_URI + "/api/v1/recruitment/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer ' + token,
        },
      });

      const respJSON = await response.json();
      // console.log(respJSON);
      // console.log(search);
      console.log(searchCategory);

      const filter = respJSON.filter((value) => {
        const category = value[searchCategory];

        if (search === "") {
          return value;
        } else if (
          category &&
          category.toLowerCase().includes(search.toLowerCase())
        ) {
          return value;
        }
      });

      const posts = respJSON.map((item, index) => (
        <RecruitContent key={item.id} index={index + 1} />
      ));
      // console.log(posts);

      // console.log(checkFilter());
      setJobPostings(
        filter.map((item, index) => (
          <RecruitContent key={item.id} index={index + 1} id={item.id} />
        ))
      );

      // console.log(jobPostings);
    };

    fetchJobPostings();
  }, [search, searchCategory]);

  return (
    <>
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
      <table>
        <thead>
          <tr>
            <th className="index">번호</th>
            <th className="index">회사</th>
            <th className="index">제목</th>
            <th className="index">마감일</th>
          </tr>
        </thead>
        {jobPostings.length ? (
          <tbody>{currentItems}</tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={"4"}>등록된 게시물 정보가 없습니다.</td>
            </tr>
          </tbody>
        )}
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default RecruitmentList;
