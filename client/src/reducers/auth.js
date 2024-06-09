const authReducer = (state = { authData: null, loading: false, error: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, error: null };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null, loading: false, error: null };
        case 'FORGOT_PASSWORD_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FORGOT_PASSWORD_SUCCESS':
            return { ...state, loading: false, error: null };
        case 'FORGOT_PASSWORD_FAILURE':
            return { ...state, loading: false, error: action.error };
        case 'RESET_PASSWORD_REQUEST':
            return { ...state, loading: true, error: null };
        case 'RESET_PASSWORD_SUCCESS':
            return { ...state, loading: false, error: null };
        case 'RESET_PASSWORD_FAILURE':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default authReducer;
