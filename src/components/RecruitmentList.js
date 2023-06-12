import { useEffect, useState } from "react";

import RecruitContent from "./RecruitmentContent";
import ReactPaginate from "react-paginate";

import "../css/CustomPagination.css";
import styles from "../css/RecruitmentList.module.css";

const RecruitmentList = (props) => {
  // State for job postings
  const [jobPostings, setJobPostings] = useState([]);
  // State for number of posts per page
  const [postsPerPage, setPostsPerPage] = useState(10);
  // State for item offset
  const [itemOffset, setItemOffset] = useState(0);
  // Calculate end offset
  const endOffset = itemOffset + postsPerPage;

  // Display current items based on item offset and end offset
  const currentItems = jobPostings.length ? (
    jobPostings
      .slice(itemOffset, endOffset)
      .map((item) => (
        <RecruitContent key={item.wantedAuthNo} id={item.wantedAuthNo} />
      ))
  ) : (
    <tr>
      <td colSpan={"4"}>등록된 게시물 정보가 없습니다.</td>
    </tr>
  );

  // Calculate page count based on number of job postings and posts per page
  const pageCount = Math.ceil(jobPostings.length / postsPerPage);

  // Handle page click event
  const handlePageClick = (event) => {
    // Calculate new item offset based on selected page and posts per page
    const newOffset = (event.selected * postsPerPage) % jobPostings.length;
    setItemOffset(newOffset);
  };

  // Fetch job postings from props when component mounts or when props change
  useEffect(() => {
    const posts = props.post;
    const fetchJobPostings = async () => {
      if (posts.length > 0) {
        setJobPostings(posts);
      } else setJobPostings([]);
    };

    fetchJobPostings();
  }, [props.post]);

  // Render a table with job postings and a pagination component
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className="index">회사</th>
            {/* Table header for company name */}
            <th className="index">제목</th>
            {/* Table header for job title */}
            <th className="index">마감일</th>
            {/* Table header for application deadline*/}
            <th className="index">채용시마감</th>
            {/* Table header for hiring deadline*/}
          </tr>
        </thead>
        <tbody>{currentItems}</tbody>
        {/* Table body with job postings */}
      </table>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick} // Function to handle page changes
          pageRangeDisplayed={5}
          pageCount={pageCount} // Total number of pages
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
          activeClassName={styles.activePagination} // CSS class for active page
        />
      </div>
    </div>
  );
};

export default RecruitmentList;
