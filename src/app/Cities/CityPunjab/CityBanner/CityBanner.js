import React from "react";
import './CityBanner.css';
import { Link } from "react-router-dom";

const CityBanner = ({heading, link, text }) => {
  return (
    <section className="CityBanner-section-os default-section-os">
      <div className="container-os">
        <div className="CityBanner-data-os">
          <h2>{heading}</h2>
          <Link to={link}>{text}</Link>
        </div>
      </div>
    </section>
  );
};

export default CityBanner;
