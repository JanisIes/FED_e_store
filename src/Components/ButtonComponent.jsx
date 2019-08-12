import React from "react";
import PropTypes from "prop-types";

const ButtonComponent = ({ title, type, color, size, isDisabled }) => {
  const btnClass = {};
  btnClass.size = size.length > 0 ? size : null;
  btnClass.color = color.length > 0 ? color : null;
  return (
    <div>
      <button
        className={`btn btn-${btnClass.size} btn-${btnClass.color} `}
        type={type}
        disabled = {isDisabled}
      >
        {title}
      </button>
    </div>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  isDisabled: PropTypes.bool
};

ButtonComponent.defaultProps = {
  type: "submit",
  color: "default",
  size: ""
};

export default ButtonComponent;
