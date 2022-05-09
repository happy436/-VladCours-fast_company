import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";

function Users() {
    const params = useParams();
    const { UserId } = params;
    return (
        <>
            {UserId ? <UserPage userId={UserId} /> : <UsersListPage />}
        </>
    );
};

export default Users;
