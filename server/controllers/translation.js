import nodemailer from 'nodemailer';
import springedge from 'springedge'
const otpStore = {};

export const sendOTPMail = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(new Date().getTime() + 5 * 60000);
    
    try {
        otpStore[email] = { otp, otpExpiry };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: 'E-Mail Verification Code',
            text: `OTP to verify your e-mail: ${otp}\nOTP will expire in 5 mins. Do not share with anyone\n\nThank you for using my stack overflow clone\n\nRegards\nNityanand K G\naka 6ft-alien`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ success: false, message: 'Failed to send OTP' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ success: true, message: 'OTP sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

export const sendOTPPhone = async (req, res) => {
    const { phone } = req.body
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpMessage = `YOUR_OTP:${otp}`
    const otpExpiry = new Date(new Date().getTime() + 5 * 60000);
    const params = {
        'sender': 'SEDEMO',
        'apikey': '621492a44a89m36c2209zs4l7e74672cj',
        'to': `91${phone}`,
        'message': `Hello ${otpMessage}, This is a test message from spring edge`,
        'format': 'json'
      };
  
    try {
        otpStore[phone] = { otp, otpExpiry };
        const resp = await springedge.messages.send(params, 5000, function (err, response) {
            if (err) {
                res.status(500).json({ success: false, message: 'Failed to send message', error: err });
                return console.log(err);
            }
            if(response.error) {
                console.log(response);
                res.status(500).json({ success: false, message: 'Invalid Number OR try using an Indian Number', error: err });
            }
            else {
                console.log('Message sent successfully');
                console.log(response);
                res.status(200).json({ success: true, message: 'Message sent successfully', response: resp });
            }
        })
    } catch (error) {
        console.error('There was an error sending the messages.');
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send message', error: error });
    }
};

export const verifyOTPMail = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const storedOtpData = otpStore[email];

        if (!storedOtpData) {
            return res.status(404).json({ success: false, message: 'OTP not found. Please request a new one.' });
        }

        if (storedOtpData.otp.toString() !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (new Date() > new Date(storedOtpData.otpExpiry)) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        delete otpStore[email];

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ success: false, message: 'An error occurred during OTP verification' });
    }
};

export const verifyOTPPhone = async (req, res) => {
    const { phone, otp } = req.body;

    try {
        const storedOtpData = otpStore[phone];

        if (!storedOtpData) {
            return res.status(404).json({ success: false, message: 'OTP not found. Please request a new one.' });
        }

        if (storedOtpData.otp.toString() !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (new Date() > new Date(storedOtpData.otpExpiry)) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        delete otpStore[phone];

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ success: false, message: 'An error occurred during OTP verification' });
    }
};

