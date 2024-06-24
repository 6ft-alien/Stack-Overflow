import * as api from '../api';

export const sendOTPMail = (email) => async (dispatch) => {
    dispatch({ type: 'SEND_OTP_REQUEST' });
    try {
        const { data } = await api.sendOTPMail(email);
        dispatch({ type: 'SEND_OTP_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during send OTP:', error.response?.data?.message || error.message);
        dispatch({ type: 'SEND_OTP_FAILURE', error: error.response?.data?.message || 'An error occurred during send OTP.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during send OTP.' };
    }
};

export const sendOTPPhone = (phone) => async (dispatch) => {
    dispatch({ type: 'SEND_OTP_REQUEST' });
    try {
        const { data } = await api.sendOTPPhone(phone);
        dispatch({ type: 'SEND_OTP_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during send OTP:', error.response?.data?.message || error.message);
        dispatch({ type: 'SEND_OTP_FAILURE', error: error.response?.data?.message || 'An error occurred during send OTP.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during send OTP.' };
    }
};

export const verifyOTPMail = (otpData) => async (dispatch) => {
    dispatch({ type: 'VERIFY_OTP_REQUEST' });
    try {
        const { data } = await api.verifyOTPMail(otpData);
        dispatch({ type: 'VERIFY_OTP_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during verify OTP:', error.response?.data?.message || error.message);
        dispatch({ type: 'VERIFY_OTP_FAILURE', error: error.response?.data?.message || 'An error occurred during verify OTP.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during verify OTP.' };
    }
};

export const verifyOTPPhone = (otpData) => async (dispatch) => {
    dispatch({ type: 'VERIFY_OTP_REQUEST' });
    try {
        const { data } = await api.verifyOTPPhone(otpData);
        dispatch({ type: 'VERIFY_OTP_SUCCESS', data });
        return { success: true, data };
    } catch (error) {
        console.error('Error during verify OTP:', error.response?.data?.message || error.message);
        dispatch({ type: 'VERIFY_OTP_FAILURE', error: error.response?.data?.message || 'An error occurred during verify OTP.' });
        return { success: false, message: error.response?.data?.message || 'An error occurred during verify OTP.' };
    }
};
