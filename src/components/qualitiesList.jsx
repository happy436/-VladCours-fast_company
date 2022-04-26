import React from "react";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return qualities.map(qual => {
        return (
            <span
                key={qual._id}
                className={`badge bg-${qual.color} m-1`}
            >
                {qual.name}
            </span>
        );
    });
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
