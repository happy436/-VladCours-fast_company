import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EditPage from "./components/page/editPage";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import "react-toastify/dist/ReactToastify.css";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div className="d-flex">
                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            <Route
                                path="/users/:UserId?/edit"
                                component={EditPage}
                            />
                            <Route path="/users/:UserId?" component={Users} />
                            <Route path="/login/:type?" component={Login} />

                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
                <ToastContainer />
            </div>
        </BrowserRouter>
    );
};

export default App;
