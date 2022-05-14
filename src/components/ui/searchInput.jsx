import React from "react";
import PropTypes from "prop-types";

function SearchInput({ onChange, value }) {
    return (
        <input
            type="text"
            name="search"
            onChange={onChange}
            value={value}
            placeholder={"Поиск по имени"}
        ></input>
    );
};

SearchInput.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SearchInput;
