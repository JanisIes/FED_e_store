import React from "react";
import PropTypes from "prop-types"; 

const InputGroup = ({name, value, isError, labelName, inputType, eventHandler}) => {

  return (
    <div>
      <div className="form-group">
        <label htmlFor={labelName.replace(" ", "_").toLowerCase()}>
          {labelName}
        </label>
        <input
          id={labelName.replace(" ", "_").toLowerCase()}
          type={inputType}
          name={name}
          className={`form-control ${isError ? "is-invalid" : null}`}
          placeholder={labelName}
          onChange={eventHandler}
          defaultValue={value}
        />
      </div>
    </div>
  );
};

InputGroup.propTypes = {
    labelName: PropTypes.string.isRequired,
    eventHandler: PropTypes.func.isRequired,
    inputType: PropTypes.string,  
};

InputGroup.defaultProps = {
  inputType: "text"
};

export default InputGroup;
