import React from "react";
import CityHeading from "../CityHeading/CityHeading";
import CityParagraph from "../CityParagraph/CityParagraph";
import "./CityExclusiveCollection.css";
import CityButton from "../CityButton/CityButton";


const CityExclusiveCollection = ({
  heading,
  text1,
  text2,
  buttonTitle,
  link,
  image,
  imageAlt
}) => {
  return (
    <section className="CityExclusiveCollection-section-os default-section-os">
      <div className="container-os">
        <div className="CityExclusiveCollection-row-os">
          <div className="CityExclusiveCollection-data-os CityExclusiveCollection-col-1-os">
            {heading && <CityHeading title={heading} />}
            {text1 && <CityParagraph title={text1} />}
            {text2 && <CityParagraph title={text2} />}
            {buttonTitle && <CityButton link={link} title={buttonTitle} />}
          </div>
          {image && (
            <div className="CityExclusiveCollection-col-2-os">
              <img src={image} alt={imageAlt} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CityExclusiveCollection;
