import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Recruitment from "../pages/RecruitmentPage";

import RecruitContent from "./RecruitmentContent";

import ReactPaginate from "react-paginate";
import "../css/CustomPagination.css";

import styles from "../css/RecruitmentList.module.css";

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
        <RecruitContent key={item.wantedAuthNo} id={item.wantedAuthNo} />
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th className="index">회사</th>
            <th className="index">제목</th>
            <th className="index">마감일</th>
            <th className="index">채용시마감</th>
          </tr>
        </thead>
        <tbody>{currentItems}</tbody>
      </table>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          pageClassName={styles.paginationItem}
          pageLinkClassName={styles.paginationLink}
          previousClassName={styles.paginationItem}
          previousLinkClassName={styles.paginationLink}
          nextClassName={styles.paginationItem}
          nextLinkClassName={styles.paginationLink}
          breakClassName={styles.paginationItem}
          breakLinkClassName={styles.paginationLink}
          containerClassName={styles.paginationContainer}
          activeClassName={styles.activePagination}
        />
      </div>
    </div>
  );
};

export default RecruitmentList;
