import React from "react";
import "./SubmitButton.css";

const SubmitButton = (props) => {
  return (
    <div className="submit-button-os">
      <button type="submit" onClick={props.onClick}>
        {props.buttonTitle}
      </button>
    </div>
  );
};

export default SubmitButton;