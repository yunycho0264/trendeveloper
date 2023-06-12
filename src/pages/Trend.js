import React, { useEffect, useState } from "react";
import styles from "../css/DetailPage.module.css";

import TrendBackground from "../components/TrendBackground";

const API_URI = process.env.REACT_APP_API_URI;

const Trend = () => {
  const [ranks, setRanks] = useState(null);
  useEffect(() => {
    // Fetch ranks data from API
    const fetchRanks = async () => {
      let from = "202004";
      let count = 40;

      const response = await fetch(
        API_URI + `/api/v1/stat/rank?from=${from}&count=${count}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      const respJSON = await response.json();
      // Extract the names of the top 5 ranks
      let tmp = respJSON.map((item) => {
        return item.name;
      });
      tmp = tmp.slice(0, 5);

      // Set the TrendBackground component with the top 5 ranks as props
      setRanks(<TrendBackground ranks={tmp} />);
    };

    // Call the fetchRanks function when the component mounts
    fetchRanks();
  }, []);

  return (
    <div className={styles.require}>
      {/* Render the TrendBackground component with the top 5 ranks */}
      {ranks}
    </div>
  );
};

export default Trend;
