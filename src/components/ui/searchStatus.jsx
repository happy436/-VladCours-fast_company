import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ usersCount }) => {
    const renderPhrase = (number) => {
        const convertNum = Number(
            String(number).slice(String(number).length - 1)
        );
        if (number === 0) {
            return "Никто с тобой не тусанет";
        } else if (number === 1 || number > 4) {
            return `${number} человек тусанет с тобой сегодня`;
        } else if (convertNum === 2 || convertNum === 3 || convertNum === 4) {
            return `${number} человека тусанет с тобой сегодня`;
        }
    };
    return (
        <h2 className={"d-flex justify-content-center"}>
            <span
                className={`badge ${
                    usersCount === 0 ? "bg-danger" : "bg-primary"
                }`}
            >
                {renderPhrase(usersCount)}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    usersCount: PropTypes.number.isRequired
};

export default SearchStatus;
