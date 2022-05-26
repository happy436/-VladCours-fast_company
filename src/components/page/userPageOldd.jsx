import React, { useEffect, useState } from "react";
import QualitiesList from "../ui/qualities/qualitiesList";
import { useHistory } from "react-router-dom";
import API from "../../api";
import PropTypes from "prop-types";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleAllUsers = () => {
        history.push(`/users`);
    };
    useEffect(() => {
        API.users.getById(userId).then(data => setUser(data));
    }, []);
    const renderUser = () => {
        if (user) {
            return (
                <>
                    <h1>{user.name}</h1>
                    <h3>{user.profession.name}</h3>
                    <QualitiesList qualities={user.qualities} />
                    <h4>Completed metting: {user.completedMeetings}</h4>
                    <h3>Rate: {user.rate}</h3>
                </>
            );
        } else {
            return <h1>Loading</h1>;
        }
    };

    return (
        <div className="d-flex w-10 flex-column">
            <span>
                {renderUser()}
            </span>
            <Link className="btn btn-primary w-10 h-10 m-2" to={`/users/${userId}/edit`}>Изменить</Link>
            <button className="btn btn-primary w-10 h-10 m-2" onClick={() => handleAllUsers()}>Все пользователи</button>
        </div>

    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
