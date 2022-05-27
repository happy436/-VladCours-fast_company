import React from "react";
import PropTypes from "prop-types";
import Card from "../common/Card";

function ProfileInfo({ data, handleRoutes, rateColor }) {
    return (
        <Card>
            <button
                className="
                        position-absolute
                        top-0
                        end-0
                        btn btn-light btn-sm
                    "
                onClick={handleRoutes}
            >
                <i className="bi bi-gear" />
            </button>
            <div
                className="
                        d-flex
                        flex-column
                        align-items-center
                        text-center
                        position-relative
                    "
            >
                <img
                    src={data.avatar}
                    className="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                />
                <div className="mt-3">
                    <h4>{data.name}</h4>
                    <p className="text-secondary mb-1">
                        {data.profession.name}
                    </p>
                    <span className="text-muted">
                        <i
                            className="
                                    bi bi-caret-down-fill
                                    text-primary
                                "
                            role="button"
                        ></i>
                        <i
                            className="
                                    bi bi-caret-up
                                    text-secondary
                                "
                            role="button"
                        ></i>
                        <span
                            className={`ms-2 ${rateColor(
                                data.rate
                            )}`}
                        >
                            {data.rate}
                        </span>
                    </span>
                </div>
            </div>
        </Card>
    );
};

ProfileInfo.propTypes = {
    data: PropTypes.object,
    handleRoutes: PropTypes.func,
    rateColor: PropTypes.func
};

export default ProfileInfo;
