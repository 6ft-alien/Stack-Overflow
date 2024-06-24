import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/auth.js'
import nodemailer from 'nodemailer'

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existinguser = await User.findOne({ email });
        if(existinguser){
            return res.status(404).json({message: "User already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ email: newUser.email, id:newUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).json({ result: newUser, token });
    }
    catch(error) {
        res.status(500).json("Something went wrong...");
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
            const existinguser = await User.findOne({ email });
            const token = jwt.sign({ email: existinguser.email, id:existinguser._id}, process.env.JWT_SECRET, { expiresIn: '1h'});

            const loginDetail = {
                browser: req.useragent.browser,
                os: req.useragent.os,
                deviceType: req.useragent.isMobile ? 'Mobile' : (req.useragent.isDesktop ? 'Desktop' : 'Laptop'),
                ipAddress: req.clientIp,
                loginTime: new Date() 
            };
            existinguser.loginDetails.push(loginDetail);
            await existinguser.save();
    
            res.status(200).json({ result: existinguser, token });
    }
    catch(error) {
        res.status(500).json("Something went wrong...")
    }
};

export const checkAuth = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await User.findOne({ email: email });
            if(!existinguser){
                return res.status(404).json({message: "User don't exist."});
            }

            const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
            if(!isPasswordCrt) {
                return res.status(400).json({message: "Invalid Credentials"});
            }
            res.status(200).json({ success: true, message: 'Authentication successful' });
        }
        catch (error) {
            console.error('Error during authentication:', error);
            res.status(500).json({ success: false, message: 'An error occurred during authentication' });
        }
}

export const sendOTP = async (req, res) => {
    const { email } = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000); 
    const otpExpiry = new Date(new Date().getTime() + 5 * 60000);

    try {
        await User.findOneAndUpdate({ email }, { $set: { otp, otpExpiry } }, { new: true, upsert: true });

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
            subject: 'Verification Code',
            text: `OTP to login to your account: ${otp}\nCode will expire in 5 mins. Do not share with anyone\n\nThank you for using my stack overflow clone\nRegards\nNityanand K G\naka 6ft-alien`
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
}

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (user.otp.toString() !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
        if (new Date() > new Date(user.otpExpiry)) {
            return res.status(400).json({ success: false, message: 'OTP has expired' });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ success: false, message: 'An error occurred during OTP verification' });
    }
};

export const forgotpassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ Status: "User does not exist" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
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
            subject: 'Reset Your Password',
            text: `Dear User,\nPlease Click on the below link to reset your password. Do not share it with anyone and the link expires in 5 minutes.\n\nhttps://stack-overflow-6ft-alien.vercel.app/reset-password/${user._id}/${token} \n\nThank you for using my stack overflow clone\nRegards\nNityanand K G\naka 6ft-alien`
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return res.status(200).json({ Status: "Success" });
    } catch (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ Status: "Error sending email" });
    }
}    

export const resetpassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hash = await bcrypt.hash(password, 12);
        const updatedUser = await User.findByIdAndUpdate(id, { password: hash });
        if (!updatedUser) {
            return res.status(404).json({ Status: "User not found" });
        }
        return res.status(200).json({ Status: "Success" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ Status: "Error with token" });
    }
}
