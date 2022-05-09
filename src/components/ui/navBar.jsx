import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link" exact activeClassName="active" to="/">Main</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/users">Users</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
