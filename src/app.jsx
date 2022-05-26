import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import EditPage from "./components/page/editPage";
import UserPage from "./components/page/userPage";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div className="d-flex">
                <Switch>
                    <Route path="/test" component={UserPage} />
                    <Route path="/users/:UserId?/edit" component={EditPage} />
                    <Route path="/users/:UserId?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
