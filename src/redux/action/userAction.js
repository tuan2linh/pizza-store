export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data 
    }
}

export const doLogout = () => {
    return {
        type: USER_LOGOUT
    }
}