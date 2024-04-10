import React from "react";
import "./CityHowGetVipNumberCard.css";
import Image from "next/image";

const CityHowGetVipNumberCard = ({
  image,
  heading,
  text,
  boldText,
  smallText,
}) => {
  return (
    <div className="CityHowGetVipNumberCard-col-os">
      <div className="CityHowGetVipNumberCard-image-os">
        <Image src={image} alt="" />
      </div>
      <div className="CityHowGetVipNumberCard-content-os">
        <h3>{heading}</h3>
        <p>
          {boldText && <span className="bold-os">{boldText}</span>} {text}
          {smallText && <span className="smaill-text-os">{smallText}</span>}
        </p>
      </div>
    </div>
  );
};

export default CityHowGetVipNumberCard;
