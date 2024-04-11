import React from "react";
import MainHeading from "../MainHeading/MainHeading";
import "./CategoriesContent.css";
import crown from "../../Assets/heading-crown-icon.svg";

const CategoriesContent = ({ id, HTMLContent }) => {
  // console.log("HTMLContent idddddddddddddddd", id);

  return (
    <section className="CategoriesContent-section-os default-section-os">
      <div className="container-os">
        <div className="CategoriesContent-heading-os featured-number-heading-os">
          <MainHeading MainHeading="Category Details" rightImage={crown} />
        </div>
        <div className="CategoriesContent-os">
          <div
            className="CategoriesContent-row-os"
            key={id}
            dangerouslySetInnerHTML={{ __html: HTMLContent }}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoriesContent;
