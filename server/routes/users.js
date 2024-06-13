import express from 'express'
import { forgotpassword, login, resetpassword, signup, sendOTP, checkAuth, verifyOTP } from '../controllers/auth.js'
import { getAllUsers, getLoginHistory, updateProfile } from '../controllers/users.js'
import auth from '../middlewares/auth.js'


const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/check-auth', checkAuth);
router.post('/send-otp', sendOTP); 
router.post('/verify-otp', verifyOTP);
router.get('/login-history/:id', auth, getLoginHistory)
router.post('/forgot-password', forgotpassword)
router.patch('/reset-password/:id/:token', resetpassword)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router
