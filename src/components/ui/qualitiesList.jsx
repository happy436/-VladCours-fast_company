import React from "react";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <ul className="card-text">
            {qualities.map((qual) => {
                return (
                    <li key={qual._id} className={`badge bg-${qual.color} m-1`}>
                        {qual.name}
                    </li>
                );
            })}
        </ul>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
