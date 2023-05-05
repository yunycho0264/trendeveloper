import React, { useState, useEffect } from "react";
import styles from "../css/Companylogo.module.css";

const API_URI = process.env.REACT_APP_API_URI;

//console.log(API_URI);

const Companylogo = () => {
  let [logoLink, setlogoLink] = useState(null);
  let respJSON = useState({});
  //let logoLink = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        console.log(urlSearchParams.get("id"));
        let recruitmentID = urlSearchParams.get("id");
        //const token = localStorage.getItem("token");

        let resp = await fetch(
          API_URI + "/api/v1/recruitment/DetailPage?id=" + recruitmentID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //"Authorization": "Bearer " + token
            },
            body: JSON.stringify(),
          }
        );
        respJSON = await resp.json();
        setlogoLink("https://work.go.kr/" + respJSON["logoLink"]);
        //logoLink = respJSON["logoLink"];
      }
    };

    fetchData();
  }, []);

  //const [detailData, setDetailData] = useState(null);

  //const zionItsLogoLink = detailData?.find(company => company.name === '(주)자이온아이티에스')?.logoLink;
  //const logoLink = zionItsLogoLink ? `https://work.go.kr${zionItsLogoLink}` : null;

  // console.log(logoLink);

  return (
    <div className={styles["company-logo"]}>
      <div className={styles["test-image"]}>
        {logoLink ? (
          <img className={styles.bp} alt="bp-logo" src={logoLink} />
        ) : null}
      </div>
    </div>
  );
};

// const Companylogo = () => {
//   return (
//     <div className={styles["company-logo"]}>
//       <div className={styles["test-image"]}>
//         {/* <img className={styles.bp} alt="bp-logo" src="img/bp.PNG"/> */}
//       </div>
//     </div>
//   );
// };

export default Companylogo;
