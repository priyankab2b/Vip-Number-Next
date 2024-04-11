import React from "react";
import Image from "next/image";
import "./PunjabLeading.css";
import CityHeading from "../CityHeading/CityHeading";
import CityParagraph from "../CityParagraph/CityParagraph";
import CityButton from "../CityButton/CityButton";

const PunjabLeading = ({ image, imageAlt, title1, para1, para2 }) => {
  return (
    <section className="PunjabLeading-section-os default-section-os">
      <div className="container-os">
        <div className="PunjabLeading-row-os">
          <div className="PunjabLeading-col-1-os">
            <Image src={image} alt={imageAlt} />
          </div>
          <div className="PunjabLeading-col-2-os">
            <CityHeading title={title1} />
            <CityParagraph title={para1} />
            <CityParagraph title={para2} />
            <CityButton link="/" title="Search your VIP Number" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PunjabLeading;
