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
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = jobPostings.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jobPostings.length / postsPerPage);

  //검색
  const [search, setSearch] = useState("");

  const handlePageClick = (event) => {
    const newOffset = (event.selected * postsPerPage) % jobPostings.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
      const posts = respJSON.map((item, index) => (
        <RecruitContent key={item.id} index={index + 1} />
      ));
      console.log(posts);
      setJobPostings(
        respJSON.map((item, index) => (
          <RecruitContent key={item.id} index={index + 1} id={item.id} />
        ))
      );
      console.log(jobPostings);
    };

    fetchJobPostings();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="index">번호</th>
            <th className="index">회사</th>
            <th className="index">제목</th>
            <th className="index">마감일</th>
          </tr>
        </thead>
        <tbody>{currentItems}</tbody>
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
