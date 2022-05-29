import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import SearchInput from "../../ui/searchInput";
import { useUser } from "../../../hooks/useUsers";
import API from "../../../api";

const Users = () => {
    const [searchData, setSearchData] = useState("");
    const [professions, setProfession] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const { users } = useUser();

    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProfession(data);
        });
    }, []);

    const handeChange = ({ target }) => {
        setSearchData(target.value);
        setSelectedProf();
    };
    const handleDelete = (id) => {
        // setUsers((prevState) => prevState.filter((user) => user._id !== id));
        console.log(id);
    };
    const handleToggleBookMark = (id) => {
        /* const index = users.findIndex((user) => user._id === id); */
        /* setUsers((prevState) => {
            return prevState.map((user, userIndex) => {
                if (userIndex === index) {
                    return { ...user, bookmark: !user.bookmark };
                } else {
                    return user;
                }
            });
        }); */
    };

    // сортировка
    const handleSort = (item) => {
        setSortBy(item);
    };

    // изменение страницы
    const pageSize = 7; // кол-во эл на странице
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // фильтрация
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchData("");
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    if (users) {
        const filteredUsers = () => {
            if (selectedProf) {
                return users.filter((user) =>
                    _.isEqual(user.profession, selectedProf)
                );
            } else if (searchData) {
                return users.filter((user) => user.name.toLowerCase().includes(searchData.toLowerCase()));
            } else {
                return users;
            }
        };
        const count = filteredUsers().length;

        const sortedUsers = _.orderBy(
            filteredUsers(),
            [sortBy.path],
            [sortBy.order]
        );

        // пагинация
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        const renderTable = (number) =>
            number !== 0 ? (
                <>
                    <UsersTable
                        users={userCrop}
                        selectedSort={sortBy}
                        onToggleBookMark={handleToggleBookMark}
                        onSort={handleSort}
                        onDelete={handleDelete}
                    />
                </>
            ) : (
                ""
            );

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className={"btn btn-secondary mt-2"}
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus usersCount={count} />
                    {users.length !== 0
                        ? (<SearchInput
                            value={searchData}
                            onChange={handeChange}
                        />)
                        : null}
                    {renderTable(users.length)}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

export default Users;
