import React from "react"; // Importing React library

import CompanyInfo from "../components/CompanyInfo"; // Importing CompanyInfo component
import Companylogo from "../components/Companylogo"; // Importing Companylogo component
import DetailMenu from "../components/DetailMenu"; // Importing DetailMenu component
import DetailTrendBack from "../components/DetailTrendBack"; // Importing DetailTrendBack component

const DetailTrend = () => {
  // Creating a functional component named DetailTrend
  return (
    // Returning JSX
    <div>
      {/* A div element */}
      <CompanyInfo />
      {/* Rendering CompanyInfo component */}
      <Companylogo />
      {/* Rendering Companylogo component */}
      <DetailMenu />
      {/* Rendering DetailMenu component */}
      <DetailTrendBack />
      {/* Rendering DetailTrendBack component */}
    </div>
  );
};

export default DetailTrend; // Exporting DetailTrend component as default
