import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))));
        navigate('/');
        return { success: true, data };
    } catch (error) {
        console.error('Error during signup:', error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || 'An error occurred during registration.' }; 
    }
};

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: 'AUTH', data });
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))));
        navigate('/');
        return { success: true, data }; 
    } catch (error) {
        console.error('Error during login:', error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || 'An error occurred during login.' };
    }
};

export const checkAuth = (authData) => async (dispatch) => {
    dispatch({ type: 'CHECK_AUTH_REQUEST' });
    try {
        const { data } = await api.checkAuth(authData);
        dispatch({ type: 'CHECK_AUTH_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during authentication:', error.response?.data?.message || error.message);
        dispatch({ type: 'CHECK_AUTH_FAILURE', error: error.response?.data?.message || 'An error occurred during authentication.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during check authentication.' };
    }
};

export const sendOTP = (email) => async (dispatch) => {
    dispatch({ type: 'SEND_OTP_REQUEST' });
    try {
        const { data } = await api.sendOTP(email);
        dispatch({ type: 'SEND_OTP_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during send OTP:', error.response?.data?.message || error.message);
        dispatch({ type: 'SEND_OTP_FAILURE', error: error.response?.data?.message || 'An error occurred during send OTP.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during send OTP.' };
    }
};

export const verifyOTP = (otpData) => async (dispatch) => {
    dispatch({ type: 'VERIFY_OTP_REQUEST' });
    try {
        const { data } = await api.verifyOTP(otpData);
        dispatch({ type: 'VERIFY_OTP_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during verify OTP:', error.response?.data?.message || error.message);
        dispatch({ type: 'VERIFY_OTP_FAILURE', error: error.response?.data?.message || 'An error occurred during verify OTP.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during verify OTP.' };
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
    try {
        const { data } = await api.forgotPassword(email);
        dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during forgot password:', error.response?.data?.message || error.message);
        dispatch({ type: 'FORGOT_PASSWORD_FAILURE', error: error.response?.data?.message || 'An error occurred during forgot password.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during forgot password.' };
    }
};

export const resetPassword = ({id, token, password}, navigate) => async (dispatch) => {
    dispatch({ type: 'RESET_PASSWORD_REQUEST' });
    try {
        const { data } = await api.resetPassword(id, token, password);
        dispatch({ type: 'RESET_PASSWORD_SUCCESS', data });
        navigate('/Auth');
        return { success: true, data };
    } catch (error) {
        console.error('Error during reset password:', error.response?.data?.message || error.message);
        dispatch({ type: 'RESET_PASSWORD_FAILURE', error: error.response?.data?.message || 'An error occurred during reset password.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during reset password.' };
    }
};
