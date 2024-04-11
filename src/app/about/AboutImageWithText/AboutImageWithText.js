import React from "react";
import Image from "next/image";
import "../About.css";

const AboutImageWithText = (props) => {
  return (
    <section className="AboutImageWithText-section-os">
      <div className="container-os">
        <div style={props.style} className="looking-number-main-ud">
          <div className="looking-text-part-ud">
            <h1>{props.heading}</h1>
            <p>{props.subHeading}</p>
            {(props.subHeading1 || props.subHeading12) && (
              <p>
                <span>{props.subHeading1}</span>
                {props.subHeading12}
              </p>
            )}
            {props.subHeading2 && (
              <p>
                {""}
                <span>{props.subHeading2}</span>
                {""}
              </p>
            )}
          </div>
          <div className="looking-img-part-ud">
            <Image src={props.image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutImageWithText;
