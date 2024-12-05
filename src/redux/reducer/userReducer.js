import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        token: '',
        role: '',
        username: '',
        customer_id: '',
        employee_id: '',
        isAuthenticated: false,
    },
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, 
                account: {
                    token: action?.payload?.token,
                    role: action?.payload?.role,
                    username: action?.payload?.username,
                    customer_id: action?.payload?.customer_id,
                    employee_id: action?.payload?.employee_id,
                    isAuthenticated: true
                },
            };
        case USER_LOGOUT:
            return {
                ...state,
                account: {
                    token: '',
                    role: '',
                    username: '',
                    customer_id: '',
                    employee_id: '',
                    isAuthenticated: false
                }
            };
        default:
            return state;
    }
};

export default userReducer;