import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink className="nav-link" exact to="/">Main</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/users">Users</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
