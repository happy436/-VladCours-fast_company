import React, { useEffect, useState } from "react";
import Card from "../../common/Card";
import PropTypes from "prop-types";
import API from "../../../api";
import QualitiesList from "../../ui/qualitiesList";
import { useHistory } from "react-router-dom";
import ProfileInfo from "../../ui/profileInfo";
import CommentBlock from "../../ui/commentsBlock/block";

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
                        <ProfileInfo
                            data={
                                {
                                    avatar: avatar,
                                    rate: user.rate,
                                    name: user.name,
                                    profession: {
                                        name: user.profession.name,
                                        _id: user.profession._id
                                    }
                                }}
                            rateColor={rateColor}
                            handleRoutes={handleRoutes}
                        />
                        <Card name={"Qualities"}>
                            <QualitiesList qualities={user.qualities} />
                        </Card>
                        <Card name={"Completed meetings"}>
                            <h1 className="display-1">
                                {user.completedMeetings}
                            </h1>
                        </Card>
                    </section>
                    <CommentBlock
                        users={users}
                    />
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
