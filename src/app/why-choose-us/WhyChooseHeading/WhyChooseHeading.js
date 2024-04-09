import React from "react";
import "./WhyChooseHeading.css";

const WhyChooseHeading = (props) => {
  return (
    <div className="WhyChooseHeading-section-os">
      <h2>{props.heading}</h2>
      <p>{props.subHeading}</p>
    </div>
  );
};

export default WhyChooseHeading;