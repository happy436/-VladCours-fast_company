import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/userListPage";
import UserProvider from "../hooks/useUsers";

function Users() {
    const params = useParams();
    const { UserId } = params;
    return (
        <UserProvider>
            {UserId ? <UserPage userId={UserId} /> : <UsersListPage />}
        </UserProvider>
    );
};

export default Users;
