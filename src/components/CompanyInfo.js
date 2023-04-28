import React from "react";
import styles from '../css/CompanyInfo.module.css'

const CompanyInfo=() => {
  return(
    <div className={styles['company-logo']}>
      <div className={styles['test-image']}>
        <img className={styles.bp} alt="bp-logo" src="img/bp.PNG"/>
      </div>
    </div>
  );
};

export default CompanyInfo;