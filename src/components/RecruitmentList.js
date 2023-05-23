import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Recruitment from "../pages/RecruitmentPage";

import RecruitContent from "./RecruitmentContent";

import ReactPaginate from "react-paginate";

import "../css/RecruitmentList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const RecruitmentList = (props) => {
  const [jobPostings, setJobPostings] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + postsPerPage;

  const currentItems = jobPostings.length ? (
    jobPostings
      .slice(itemOffset, endOffset)
      .map((item, index) => (
        <RecruitContent
          key={item.wantedAuthNo}
          index={index + 1}
          id={item.wantedAuthNo}
        />
      ))
  ) : (
    <tr>
      <td colSpan={"4"}>등록된 게시물 정보가 없습니다.</td>
    </tr>
  );

  const pageCount = Math.ceil(jobPostings.length / postsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * postsPerPage) % jobPostings.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const posts = props.post;
    const fetchJobPostings = async () => {
      if (posts.length > 0) {
        setJobPostings(posts);
      } else setJobPostings([]);
    };

    fetchJobPostings();
  }, [props.post]);

  return (
    <div>
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
    </div>
  );
};

export default RecruitmentList;
