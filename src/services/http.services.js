import axios from "axios";
/* import { toast } from "react-toastify"; */
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

function transformData(data) {
    return data && !data._id ? Object.keys(data).map((key) => ({ ...data[key] })) : data;
}

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containeSlash = /\/$/gi.test(config.user);
            config.url =
                (containeSlash ? config.url.slice(0, -1) : config.url) +
                ".json";
            const expiresdate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresdate < Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            /* console.log(error); */
            /* toast.error("Unexpected error"); */
        } else {
            // toast.error("Expected error")
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
