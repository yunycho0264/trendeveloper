import React from "react";

import RecruitBackground from "../components/RecruitmentBackground";

const Recruitment = () => {
  return (
    <div
      style={{
        width: "70vw",
        marginLeft: "18vw",
        marginBottom: "10vh",
        marginTop: "1vh",
        background: "#fff",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto 100px",
      }}
    >
      {/* Background box */}
      <RecruitBackground />
    </div>
  );
};

export default Recruitment;
