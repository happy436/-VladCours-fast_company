import React from "react";
import { useParams } from "react-router-dom";
import User from "./user";
import Users from "../components/users";

const UsersList = () => {
    const params = useParams();
    const { UserId } = params;
    return (
        <>
            {UserId ? <User id={ UserId }/> : <Users/>}
        </>
    );
};

export default UsersList;
