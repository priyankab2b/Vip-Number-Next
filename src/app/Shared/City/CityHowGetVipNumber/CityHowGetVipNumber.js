import React from "react";
import "./CityHowGetVipNumber.css";
import CityHowGetVipNumberCard from "./CityHowGetVipNumberCard/CityHowGetVipNumberCard";

const CityHowGetVipNumber = ({ headingPart1, headingPart2, headingPart3, image1, image2, image3, image4, image5, heading1, heading2, heading3, heading4, heading5, text1, text2, text3, text4, text5, boldText, smallText }) => {
  return (
    <section className="CityHowGetVipNumber-section-os default-section-os">
      <div className="container-os">
        <div className="CityHowGetVipNumber-heading-os">
          {headingPart1 &&<h3>
            {headingPart1 && <span>{headingPart1}</span>}
            {headingPart2}
            {headingPart3 &&<span>{headingPart3}</span>}
          </h3>}
        </div>
        <div className="CityHowGetVipNumber-row-os">
          <CityHowGetVipNumberCard
            image={image1}
            heading={heading1}
            text={text1}
          />
          <CityHowGetVipNumberCard
            image={image2}
            heading={heading2}
            text={text2}
          />
          <CityHowGetVipNumberCard
            image={image3}
            heading={heading3}
            text={text3}
          />
          <CityHowGetVipNumberCard
            image={image4}
            heading={heading4}
            text={text4}
            smallText={smallText}
          />
          <CityHowGetVipNumberCard
            image={image5}
            heading={heading5}
            boldText={boldText}
            text={text5}
          />
        </div>
      </div>
    </section>
  );
};

export default CityHowGetVipNumber;
