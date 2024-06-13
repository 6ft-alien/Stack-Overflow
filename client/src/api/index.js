import axios from 'axios';

const API = axios.create({ baseURL: 'https://stack-overflow-server-psi.vercel.app/' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);
export const checkAuth = (authData) => API.post('/user/check-auth', authData);
export const sendOTP = (email) => API.post('/user/send-otp', { email });
export const verifyOTP = (otpData) => API.post('/user/verify-otp', otpData);
export const forgotPassword = (email) => API.post('/user/forgot-password', email);
export const resetPassword = (id, token, password) => API.patch(`/user/reset-password/${id}/${token}`, { password });

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });


export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const fetchLoginHistory = (id) => API.get(`/user/login-history/${id}`);
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)
