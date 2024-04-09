import React from "react";
import "./ImageWithText.css";
import Image from "next/image";

const ImageWithText = (props) => {
  return (
    <section className="ImageWithText-section-os">
      <div className="container-os">
        <div style={props.row_style} className="ImageWithText-row-os">
          <div className="ImageWithText-line-image-os">
            <Image src={props.lineImg} alt="" />
          </div>
          <div className="ImageWithText-col-1-os">
            <Image src={props.mainImage} alt="" />
          </div>
          <div className="ImageWithText-col-2-os">
            <h2>{props.heading}</h2>
            <p>{props.subHeading}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageWithText;
