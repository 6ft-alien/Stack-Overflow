import express from 'express'
import { forgotpassword, login, resetpassword, signup } from '../controllers/auth.js'
import { getAllUsers, getLoginHistory, updateProfile } from '../controllers/users.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/login-history/:id', auth, getLoginHistory)
router.post('/forgot-password', forgotpassword)
router.patch('/reset-password/:id/:token', resetpassword)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router
