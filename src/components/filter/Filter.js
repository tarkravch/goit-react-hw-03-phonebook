import React from "react";
import PropTypes from "prop-types";

const Filter = ({ value, onChange }) => (
  <div>
    <label>
      <input type="text" value={value} onChange={onChange} />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
