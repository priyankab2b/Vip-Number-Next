import React, { forwardRef } from "react";

const SearchFilterInput = forwardRef((props, ref) => {
  const event = () => {
  };

  return (
    <div className="search-filter-input-field-os">
      <label>{props.inputLabel}</label>
      <input
        ref={ref}
        value={props.inputValue || ""}
        onChange={props.inputOnChange || event}
        type={props.inputType}
        placeholder={props.placeHolder}
        {...(props?.min ? { min: props.min } : {})}
      />
    </div>
  );
});

export default SearchFilterInput;
