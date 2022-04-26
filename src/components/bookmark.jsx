import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onClick }) => {
    return (
        <button className="btn btn-secondary" onClick={onClick}>
            <i
                className={`bi ${status ? "bi-bookmark-fill" : "bi-bookmark"}`}
            ></i>
        </button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Bookmark;
