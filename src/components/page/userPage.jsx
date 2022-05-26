import React, { useEffect, useState } from "react";
import Card from "../common/Card";
import PropTypes from "prop-types";
import API from "../../api";
import QualitiesList from "../ui/qualities/qualitiesList";
import CommentList from "../ui/comments/CommentList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [avatar, setAvatar] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
        API.users.fetchAll().then((data) => {
            setUsers(data.map((user) => ({ _id: user._id, name: user.name })));
        });
    }, []);
    const rateColor = (rate) => {
        if (rate <= 2.5) {
            return "text-danger";
        } else if (rate <= 4) {
            return "text-warning";
        } else if (rate <= 5) {
            return "text-success";
        }
    };
    useEffect(() => {
        setAvatar(randomImage());
    }, []);
    const randomImage = () => {
        return `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`;
    };
    const handleRoutes = () => {
        history.push(`${history.location.pathname}/edit`);
    };
    return (
        <main className="container mt-3">
            {user ? (
                <div className="row gutters-sm">
                    <section className="col-md-4 mb-3">
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
                                    src={avatar}
                                    className="rounded-circle shadow-1-strong me-3"
                                    alt="avatar"
                                    width="65"
                                    height="65"
                                />
                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">
                                        Доктор
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
                                                user.rate
                                            )}`}
                                        >
                                            {user.rate}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Card>
                        <Card name={"Qualities"}>
                            <QualitiesList qualities={user.qualities} />
                        </Card>
                        <Card name={"Completed meetings"}>
                            <h1 className="display-1">
                                {user.completedMeetings}
                            </h1>
                        </Card>
                    </section>
                    <section className="col-md-8">
                        <Card extraClassName="mb-2">
                            <div>
                                <h2>New comment</h2>
                                <span className="mb-4">
                                    <select
                                        className="form-select"
                                        name="userId"
                                    >
                                        <option disabled defaultValue={""}>
                                            Выберите пользователя
                                        </option>
                                        {users ? users.map((item) => (
                                            <option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </option>
                                        )) : null}
                                    </select>
                                </span>
                                <span className="mb-4">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label"
                                    >
                                        Сообщение
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                    ></textarea>
                                </span>
                                <button className="btn btn-primary mt-2">
                                    Опубликовать
                                </button>
                            </div>
                        </Card>
                        <CommentList/>
                    </section>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </main>
    );
};

UserPage.propTypes = {
    rate: PropTypes.number, // delete in the future
    userId: PropTypes.string.isRequired
};

export default UserPage;
