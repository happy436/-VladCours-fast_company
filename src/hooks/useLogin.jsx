import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpLogin = axios.create();
const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
    async function signIn({ email, password, ...rest }) {
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpLogin.post(URL, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: 0,
                completedMeetings: 0,
                ...rest
            });
            console.log(data);
        } catch (error) {
            errorCather(error);
            const { code, message } = error.response.data.error;
            console.log(message);
            const errorObject = {
                email: {
                    email: "Пользователь с таким email не найден"
                },
                pass: { password: "Неверный пароль" }
            };
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    throw errorObject.email;
                } else if (message === "INVALID_PASSWORD") {
                    throw errorObject.pass;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
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
