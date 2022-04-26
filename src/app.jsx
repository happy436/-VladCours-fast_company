import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import UsersList from "./layouts/usersList";
import Login from "./layouts/login";
import Main from "./layouts/main";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div className="d-flex">
                <Switch>
                    <Route path="/users/:UserId?" component={UsersList} />
                    <Route path="/login" component={Login} />
                    <Route path="/" exact component={Main} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
