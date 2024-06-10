import { combineReducers } from 'redux';
import authReducer from './auth';
import currentUserReducer from './currentUser'
import questionsReducer from './questions'
import usersReducer from './users';
import loginHistoryReducer from './loginHistory';

export default combineReducers({
    auth: authReducer,
    currentUserReducer,
    questionsReducer,
    usersReducer,
    loginHistoryReducer
});
