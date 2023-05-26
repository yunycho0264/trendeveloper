import { prop } from "dom7";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import styles from "../css/RecruitmentList.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const RecruitContent = (props) => {
  const [companyInfo, setCompanyInfo] = useState({});
  const [closeDtInfo, setCloseDtInfo] = useState({});

  useEffect(() => {
    // console.log(props);

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
        // console.log(respJSON);
        const closeDtSrc = respJSON.closeDt;
        let closeDtInfoTmp = {};
        if (closeDtSrc.length > 0) {
          const closeDtArr = closeDtSrc.split("  ");
          if (closeDtArr.length === 1) {
            closeDtInfoTmp.date = closeDtArr[0];
            closeDtInfoTmp.until = "🚫아니하다.🚫";
            // console.log(closeDtInfo.date);
          } else {
            closeDtInfoTmp.date = closeDtArr[1];
            closeDtInfoTmp.until = "🙆그러하다.🙆";
            // console.log(closeDtInfo.date);
          }
        }
        setCompanyInfo(respJSON);
        setCloseDtInfo(closeDtInfoTmp);
        // console.log(respJSON);
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
      <td className={styles.link}>
        <Link to={`/recruitement/detail?id=${companyInfo.wantedAuthNo}`}>
          {companyInfo.wantedTitle}
        </Link>
      </td>
      {/* <td>{companyInfo.closeDt}</td> */}
      <td>{closeDtInfo.date}</td>
      <td>{closeDtInfo.until}</td>
    </tr>
  );
};

export default RecruitContent;
