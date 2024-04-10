import React from "react";
import "./CityFavouriteNumber.css";
import CityHeading from "../CityHeading/CityHeading";
import CityParagraph from "../CityParagraph/CityParagraph";
import CityButton from "../CityButton/CityButton";

const CityFavouriteNumber = ({ title1, title2, title3, title4, buttonTitle, link }) => {
  return (
    <section className="CityFavouriteNumber-section-os">
      <div className="container-os">
        <div className="CityFavouriteNumber-data-os">
          {title1 && <CityHeading title={title1} />}
          {title2 && <CityParagraph title={title2} />}
          <CityButton link={link} title={buttonTitle} />
        </div>
      </div>
    </section>
  );
};

export default CityFavouriteNumber;
