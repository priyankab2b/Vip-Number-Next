import React from "react";
import Link from "next/link";
import "./HowWeDeliverBanner.css";

const HowWeDeliverBanner = (props) => {
  return (
    <section className="HowWeDeliverBanner-section-os">
      <div className="container-os">
        <div className="HowWeDeliverBanner-row-os">
          <h1>{props.headingText}</h1>
          {props.buttonTitle && (
            <Link href={props.buttonLink}>
              {props.buttonTitle}
              <span>
                <svg
                  width="13"
                  height="11"
                  viewBox="0 0 13 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L6.9823 5.75513L1 10.5103" stroke="white" />
                  <path
                    d="M6.06195 1L12.0443 5.75513L6.06195 10.5103"
                    stroke="white"
                  />
                </svg>
              </span>
            </Link>
          )}
          {props.textPara && <p>{props.textPara}</p>}
        </div>
      </div>
    </section>
  );
};

export default HowWeDeliverBanner;
