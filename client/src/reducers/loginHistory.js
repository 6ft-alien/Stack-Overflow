const loginHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_LOGIN_HISTORY':
            return action.payload;
        default:
            return state;
    }
};

export default loginHistoryReducer;
