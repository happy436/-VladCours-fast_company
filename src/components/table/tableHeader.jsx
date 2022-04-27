import React from "react";
import PropTypes from "prop-types";

export default function TableHeader({ onSort, selectedSort, columns }) {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    function sortArrow(item) {
        if (selectedSort.path === item) {
            if (selectedSort.order === "asc") {
                return (<i className="bi bi-caret-down-fill"></i>);
            } else {
                return (<i className="bi bi-caret-up-fill"></i>);
            }
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        {...{ role: columns[column].path && "button" }}
                        onClick={columns[column].path
                            ? () => handleSort(columns[column].path)
                            : undefined}
                        scope="col"
                    >
                        {columns[column].name}
                        {sortArrow(columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};
