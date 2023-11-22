import React from "react";
import "./MainHeading.css";

const MainHeading = (props) => {
  return (
    <div className="mainHeading-os">
      {props.MainHeading && <h2>{props.MainHeading}</h2>}
      {props.rightImage && (
        <span>
          <img src={props.rightImage} alt="" />
        </span>
      )}
    </div>
  );
};

export default MainHeading;