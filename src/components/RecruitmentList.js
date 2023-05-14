import { useEffect, useState } from 'react';

const API_URI = process.env.REACT_APP_API_URI;

const RecruitmentList = () => {
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    const fetchJobPostings = async () => {
      // const token = localStorage.getItem('token');

      const response = await fetch(API_URI + '/api/v1/recruitment/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + token,
        },
      });

      const respJSON = await response.json();
      console.log(respJSON);
      setJobPostings(respJSON);
    };

    fetchJobPostings();
  }, []);

  return (
    <div>
      <ul>
        {jobPostings.map((item, index) => (
          <li key={index}>
            <h3>{item.cName}</h3>
            <p>Wanted Auth No: {item.id}</p>
            {/* Display additional desired information here */}
            <a href={`/recruitement/DetailPage?id=${item.id}`}>
              View Details
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruitmentList;
