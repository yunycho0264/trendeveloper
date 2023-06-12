import React, { useState, useEffect } from "react";
import styles from "../css/CompanyInfo.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const CompanyInfo = () => {
  let [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    // Get the URL search parameters
    const urlSearchParams = new URLSearchParams(window.location.search);

    // Define a function to fetch company information
    const fetchCompanyInfo = async () => {
      // Get the recruitment ID from the URL search parameters
      let recruitmentID = urlSearchParams.get("id");

      // Fetch recruitment details using the recruitment ID
      const response = await fetch(
        API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      // Parse the response as JSON
      const respJSON = await response.json();

      // Fetch company details using the company name obtained from the recruitment details
      const response2 = await fetch(
        API_URI + "/api/v1/company/detail?id=" + respJSON["companyName"],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      // Parse the response as JSON and set the company information state
      const respJSON2 = await response2.json();
      setCompanyInfo(respJSON2);
    };

    // Call the fetchCompanyInfo function
    fetchCompanyInfo();
  }, []);

  // Component for displaying company information
  return (
    <div className={styles["company-info"]}>
      <div className={styles["info-box"]}>
        {/* Label for company information */}
        <div className={styles["info-title"]}>Company Information</div>
        {/* List of company information */}
        <div className={styles["info-type"]}>
          <ul className={styles["info-list"]}>
            {CompanyInfo && (
              <>
                <li>
                  Company Name{" "}
                  <span>
                    {companyInfo ? companyInfo.companyName : "Loading..."}
                  </span>
                </li>
                <li>
                  Company Type{" "}
                  <span>
                    {companyInfo ? companyInfo.busiSize : "Loading..."}
                  </span>
                </li>
                <li>
                  Number of Employees{" "}
                  <span>
                    {companyInfo ? companyInfo.totPsncnt : "Loading..."}
                  </span>
                </li>
                <li>
                  Capital{" "}
                  <span>
                    {companyInfo ? companyInfo.capitalAmt : "Loading..."}
                  </span>
                </li>
                <li>
                  Annual Sales{" "}
                  <span>
                    {companyInfo ? companyInfo.yrSalesAmt : "Loading..."}
                  </span>
                </li>
                <li>
                  CEO Name{" "}
                  <span>
                    {companyInfo ? companyInfo.reperNm : "Loading..."}
                  </span>
                </li>
                <li>
                  Company Address{" "}
                  <span>
                    {companyInfo ? companyInfo.corpAddr : "Loading..."}
                  </span>
                </li>
                <li>
                  Homepage{" "}
                  <span>
                    {companyInfo ? (
                      <a
                        href={`https://${companyInfo.homePg}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {companyInfo.homePg}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
