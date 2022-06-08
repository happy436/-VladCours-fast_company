import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { elapsedTimeCalculation } from "../../../utils/elapsedTime";

function Comment({ handleDeleteComment, id, data }) {
    const [name, setName] = useState();
    const [time, setTime] = useState(new Date(Number(data.created_at)));
    useEffect(() => {
        API.users.getById(data.userId).then((data) => setName(data.name));
        setTime(elapsedTimeCalculation(time));
    }, []);

    return (
        <>
            {name ? (
                <div className="bg-light card-body mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start">
                                <img
                                    src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                                    className="
                                rounded-circle
                                shadow-1-strong
                                me-3
                            "
                                    alt="avatar"
                                    width="65"
                                    height="65"
                                />
                                <div
                                    className="
                                flex-grow-1 flex-shrink-1
                            "
                                >
                                    <div className="mb-4">
                                        <div
                                            className="
                                        d-flex
                                        justify-content-between
                                        align-items-center
                                    "
                                        >
                                            <p className="mb-1">
                                                {name}
                                                <span className="ms-1 small">
                                                    - {time}
                                                </span>
                                            </p>
                                            <button
                                                className="
                                            btn btn-sm
                                            text-primary
                                            d-flex
                                            align-items-center
                                        "
                                                onClick={() =>
                                                    handleDeleteComment(id)
                                                }
                                            >
                                                <i
                                                    className="
                                                bi bi-x-lg
                                            "
                                                ></i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">
                                            {data.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

Comment.propTypes = {
    handleDeleteComment: PropTypes.func,
    id: PropTypes.string,
    data: PropTypes.object
};

export default Comment;
