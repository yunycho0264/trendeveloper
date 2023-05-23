import { prop } from "dom7";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

const RecruitContent = (props) => {
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    console.log(props);

    const recruitmentID = props.id;
    const fetchCompanyInfo = async () => {
      try {
        const response = await fetch(
          `${API_URI}/api/v1/recruitment/detail?id=${recruitmentID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const respJSON = await response.json();
        setCompanyInfo(respJSON);
        // console.log(respJSON);
        // console.log(companyInfo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCompanyInfo();
    // console.log(companyInfo);
  }, [props]);

  return (
    <tr key={props.index}>
      <td>{props.index}</td>
      <td>{companyInfo.companyName}</td>
      <td>
        <Link to={`DetailPage?id=${companyInfo.wantedAuthNo}`}>
          {companyInfo.wantedTitle}
        </Link>
      </td>
      <td>{companyInfo.closeDt}</td>
    </tr>
  );
};

export default RecruitContent;
