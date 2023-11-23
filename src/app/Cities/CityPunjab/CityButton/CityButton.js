import React from "react";
import "./CityButton.css";
import { Link } from "react-router-dom";

const CityButton = ({link, title}) => {
  return <Link className="CityButton-button-os" to={link}>{title}</Link>;
};

export default CityButton;
