import React from "react";
import PropTypes from "prop-types";

function SearchInput({ onChange, value }) {
    return (
        <input
            type="text"
            name="search"
            onChange={onChange}
            value={value}
        ></input>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default SearchInput;
