import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = qualities ? getQuality(qualities) : [];
    if (!isLoading) {
        return <ul className="card-text">
            {qual.map((qual) => {
                return (
                    <li key={qual._id} className={`badge bg-${qual.color} m-1`}>
                        {qual.name}
                    </li>
                );
            })}
        </ul>;
    } else {
        return <p>Loading...</p>;
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
