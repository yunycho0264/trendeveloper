import { prop } from "dom7";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiCircle, BiX } from "react-icons/bi";
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
            closeDtInfoTmp.until = (
              <>
                <BiX size="30px" color="#E00000" />
              </>
            );
            // console.log(closeDtInfo.date);
          } else {
            closeDtInfoTmp.date = closeDtArr[1];
            closeDtInfoTmp.until = (
              <>
                <BiCircle size="20px" color="#008000" />
              </>
            );
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
  }, []);

  return (
    <tr key={props.index}>
      <td>{companyInfo.companyName}</td>
      <td className={styles.link}>
        <Link to={`/recruitement/detail?id=${companyInfo.wantedAuthNo}`}>
          {companyInfo.wantedTitle}
        </Link>
      </td>
      {/* <td>{companyInfo.closeDt}</td> */}
      <td style={{ textAlign: "center" }}>{closeDtInfo.date}</td>
      <td style={{ textAlign: "center" }}>{closeDtInfo.until}</td>
    </tr>
  );
};

export default RecruitContent;
