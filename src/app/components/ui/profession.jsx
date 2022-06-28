import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const getAllProfessions = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const getProfession = (profId) => {
        return getAllProfessions.find((p) => p._id === profId);
    };
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
