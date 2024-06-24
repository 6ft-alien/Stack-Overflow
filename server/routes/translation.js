import express from 'express';
import { sendOTPMail, sendOTPPhone, verifyOTPMail, verifyOTPPhone } from '../controllers/translation.js';

const router = express.Router();

router.post('/send-otp-mail', sendOTPMail);
router.post('/verify-otp-mail', verifyOTPMail);
router.post('/send-otp-phone', sendOTPPhone);
router.post('/verify-otp-phone', verifyOTPPhone);

export default router;
