import React from "react";
import styles from '../css/CompanyInfo.module.css'

const CompanyInfo=() => {
  return(
    <div className={styles['company-info']}>
      <div className={styles['info-box']}>
        <head>
          기업 정보
        </head>
      </div>
    </div>
  );
};

export default CompanyInfo;