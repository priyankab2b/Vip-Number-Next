import React from "react";
import "../WhyChooseVipNumberShop.css";

const WhyChooseVipNumberShopCard = (props) => {
  return (
    <div className="WhyChooseVipNumberShopCard-col-os">
      <h2>{props.heading}</h2>
      <p>{props.subHeading}</p>
    </div>
  );
};

export default WhyChooseVipNumberShopCard;