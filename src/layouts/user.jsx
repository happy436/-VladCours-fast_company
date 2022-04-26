import React, { useEffect, useState } from "react";
import QualitiesList from "../components/qualitiesList";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import API from "../api";

const User = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();
    const handleAllUsers = () => {
        history.push("/users");
    };
    useEffect(() => {
        API.users.getUserById(id).then(data => setUser(data));
    }, []);
    console.log(user);
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
            <button className="btn btn-primary w-10 h-10 m-2" onClick={() => handleAllUsers()}>Все пользователи</button>
        </div>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired
};

export default User;
