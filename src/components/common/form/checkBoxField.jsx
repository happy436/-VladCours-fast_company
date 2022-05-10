import React from "react";
import PropTypes from "prop-types";

function CheckBoxField({ name, value, onChange, children, error }) {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    type="checkbox"
                    className={getInputClasses()}
                    value=""
                    id={name}
                    onChange={handleChange}
                    checked={value}
                />
                <label className="form-check-label is-Invalid" htmlFor={name}>
                    {children}
                </label>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

CheckBoxField.propTypes = {
    error: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    name: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxField;
