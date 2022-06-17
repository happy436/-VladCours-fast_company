const TOKENS_CONST = {
    TOKEN_KEY: "jwt-expires",
    REFRESH_KEY: "jwt-refresh-token",
    EXPIRE_KEY: "jwt-expires",
    USERID_KEY: "user-local-id"
};

export function setTokens({ refreshToken, idToken, localId, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKENS_CONST.USERID_KEY, localId);
    localStorage.setItem(TOKENS_CONST.TOKEN_KEY, idToken);
    localStorage.setItem(TOKENS_CONST.REFRESH_KEY, refreshToken);
    localStorage.setItem(TOKENS_CONST.EXPIRE_KEY, expiresDate);
};

export function getAccessToken() {
    return localStorage.getItem(TOKENS_CONST.TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(TOKENS_CONST.REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(TOKENS_CONST.EXPIRE_KEY);
}

export function getUserId() {
    return localStorage.getItem(TOKENS_CONST.USERID_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId
};

export default localStorageService;
