import React from "react";
import { ProgressBar } from "react-bootstrap";
import useMockData from "./../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    function handleClick() {
        initialize();
    }
    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Initialization data on firebase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}</li>
                <li><ProgressBar now={progress} label={`${progress}%`} /></li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Init
            </button>
        </div>
    );
};

export default Main;
