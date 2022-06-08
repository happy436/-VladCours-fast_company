import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpLogin = axios.create();
const L = React.createContext();

export const useLogin = () => {
    return useContext(L);
};

const LoginProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
    async function signIn({ email, password, ...rest }) {
        const URL = `https://identitytoolkit.googlepis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(URL,
                {
                    email,
                    password,
                    returnSecureToken: true
                });
            setTokens(data);
            await createUser(
                {
                    _id: data.localId,
                    email,
                    rate: 0,
                    completedMeetings: 0,
                    ...rest
                }
            );
            console.log(data);
        } catch (error) {
            errorCather(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = { email: "Пользователь с таким email уже существует" };
                    throw errorObject;
                }
            }
        }
    };

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {
            errorCather(error);
        }
    };
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    function errorCather(error) {
        const { message } = error;
        setError(message);
    }
    return (
        <LoginContext.Provider value={{ signIn, currentUser }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default LoginProvider;
