import React from "react";
import "./DeliveryProcessCard.css";
import Image from "next/image";

const DeliveryProcessCard = ({ image, heading, paragraph }) => {
  return (
    <div className="DeliveryProcessCard-col-os">
      {image && (
        <div className="DeliveryProcessCard-image-os">
          <Image src={image} alt="" />
        </div>
      )}
      {heading && <h3>{heading}</h3>}
      {paragraph && <p>{paragraph}</p>}
    </div>
  );
};

export default DeliveryProcessCard;
