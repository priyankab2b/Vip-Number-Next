import React from "react";
import "./ViewMoreButton.css";

const ViewMoreButton = ({ onClick, title }) => {
  return (
    <button
      className="ViewMoreButton-button-os"
      type="button"
      onClick={onClick}
    >
      {title}
      <span>
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 2V0H17V2H1ZM1 16V10H0V8L1 3H17L18 8V10H17V16H15V10H11V16H1ZM3 14H9V10H3V14ZM2.05 8H15.95L15.35 5H2.65L2.05 8Z"
            fill="white"
          />
        </svg>
      </span>
    </button>
  );
};

export default ViewMoreButton;