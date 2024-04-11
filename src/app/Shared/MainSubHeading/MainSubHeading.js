import React from "react";
import "./MainSubHeading.css";

const MainSubHeading = (props) => {
  return (
    <div className="MainSubHeading-os">
      <p>{props.MainSubHeadingText}</p>
    </div>
  );
};

export default MainSubHeading;
