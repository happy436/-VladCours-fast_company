import React from "react";
import PropTypes from "prop-types";
import Table, { TableHeader, TableBody } from "../common/table";
import QualitiesList from "../ui/qualitiesList";
import Bookmark from "../common/bookmark";
import { Link } from "react-router-dom";
import Profession from "./profession";

function UsersTable({
    users,
    selectedSort,
    onToggleBookMark,
    onSort,
    onDelete,
    ...rest
}) {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: user => <Link to={`/users/${user._id}`} >{user.name}</Link>
        },
        qualities: {
            name: "Качество",
            component: user => <QualitiesList qualities={user.qualities}/>
        },
        professions: {
            component: user => <Profession id={user.profession}/>,
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            path: "rate",
            name: "Оценка"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: user => (<Bookmark
                status={user.bookmark}
                onClick={() => onToggleBookMark(user._id)}
            />)
        },
        delete: {
            component: user => (<button
                className="btn btn-danger"
                onClick={() => onDelete(user._id)}
            >
                delete
            </button>)
        }
    };

    return (
        <Table>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;
