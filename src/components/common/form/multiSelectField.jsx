import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function MultiSelectField({ onChange, options, name, label, defaultValue }) {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id,
                color: options[optionName].color
            }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                className="basic-multi-select"
                defaultValue={defaultValue}
                classNamePrefix="select"
                options={optionsArray}
                onChange={handleChange}
                name={name}
                closeMenuOnSelect={false}
            />
        </div>
    );
}

MultiSelectField.propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};

export default MultiSelectField;
