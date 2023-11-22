import React from "react";
import "./RegisterLoginInputField.css";
import { useEffect, forwardRef } from "react";

const RegisterLoginInputField = forwardRef((props, ref) => {
  useEffect(() => {
    if (props.inputPlaceholder === "Mobile No.") {
      if (ref?.current) {
        ref?.current?.focus();
      }
    }
  }, []);
  return (
    <div className="RegisterLoginInputField-os">
      <input
        type={props.inputType}
        placeholder={props.inputPlaceholder}
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props?.onBlur}
        autoFocus={props?.autoFocus}
        ref={ref}
      />
    </div>
  );
});

export default RegisterLoginInputField;
