import React from "react";
import PropTypes from "prop-types";

const Card = ({ name = "", children, extraClassName }) => {
    const cardType = () => {
        if (name !== "") {
            return (
                <div
                    className="
                    card-body
                    d-flex
                    flex-column
                    justify-content-center
                    text-center
                "
                >
                    <h5 className="card-title">
                        <span>{name}</span>
                    </h5>
                    {children}
                </div>);
        } else {
            return (
                <div className="card-body">
                    {children}
                </div>
            );
        };
    };
    return (
        <article className={`card ${extraClassName}`}>
            {cardType()}
        </article>
    );
};

Card.defaultProps = {
    name: "",
    extraClassName: "mb-3"
};

Card.propTypes = {
    name: PropTypes.string,
    extraClassName: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Card;
