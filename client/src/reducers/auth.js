const authReducer = (state = { authData: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, error: null };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: null };
        case 'FORGOT_PASSWORD_REQUEST':
        case 'RESET_PASSWORD_REQUEST':
        case 'SEND_OTP_REQUEST':
        case 'VERIFY_OTP_REQUEST':
        case 'CHECK_AUTH_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FORGOT_PASSWORD_SUCCESS':
        case 'RESET_PASSWORD_SUCCESS':
        case 'SEND_OTP_SUCCESS':
        case 'VERIFY_OTP_SUCCESS':
        case 'CHECK_AUTH_SUCCESS':
            return { ...state, loading: false, error: null };
        case 'FORGOT_PASSWORD_FAILURE':
        case 'RESET_PASSWORD_FAILURE':
        case 'SEND_OTP_FAILURE':
        case 'VERIFY_OTP_FAILURE':
        case 'CHECK_AUTH_FAILURE':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default authReducer;
