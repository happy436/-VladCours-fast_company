import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/qualities.service";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualitiesList();
    }, []);
    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function getQuality(listId = []) {
        if (listId.length > 0) {
            return listId.map((item) => {
                return qualities.find((q) => q._id === item);
            });
        }
        /* return (qualities.find((p) => {
            console.log(id);
            return (p._id === id);
        })); */
    }
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
            {!isLoading ? children : <h1>Loading...</h1>}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
