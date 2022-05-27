/* eslint-disable new-cap */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";

function Comment({ handleDeleteComment, id, data }) {
    const [name, setName] = useState();
    const [time, setTime] = useState(new Date(Number(data.created_at)));
    useEffect(() => {
        API.users.getById(data.userId).then((data) => setName(data.name));
        setTime(elapsedTimeCalculation());
    }, []);
    const ten = (date) => {
        if (date < 10) {
            return `0${date}`;
        }
    };
    const elapsedTimeCalculation = () => {
        const date = new Date();
        const diff = date - time;
        if (diff > 3.154e10) {
            return `${ten(time.getDate())}.${ten(time.getMonth())}.${ten(
                time.FullYear()
            )}`;
        } else if (diff > 2.628e9) {
            return `${ten(time.getDate())} ${time.toLocaleString("en-EN", {
                month: "short"
            })}`;
        } else if (diff > 8.64e7) {
            return `${ten(time.getDate())} дней назад`;
        } else if (diff > 3.6e6) {
            return `${Math.floor(diff / 3.6e6)} часов назад`;
        } else if (diff > 1.8e6) {
            return `30 минут назад`;
        } else if (diff > 60000 && diff < 1.8e6) {
            return `${Math.floor(diff / 60000)} минут назад`;
        } else if (diff > 1000) {
            return `${Math.floor(diff / 1000)} секунд назад`;
        } else {
            return "сейчас";
        }
    };
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
