import React from "react";
import "./CityButton.css";
import Link from "next/link";

const CityButton = ({ link, title }) => {
  return (
    <Link className="CityButton-button-os" href={link}>
      {title}
    </Link>
  );
};

export default CityButton;
