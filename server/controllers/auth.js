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
        if(!existinguser){
            return res.status(404).json({message: "User don't exist."});
        }

        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if(!isPasswordCrt) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({ email: existinguser.email, id:existinguser._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(200).json({ result: existinguser, token });
    }
    catch(error) {
        res.status(500).json("Something went wrong...")
    }
};


export const forgotpassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ Status: "User does not exist" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
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
            text: `http://localhost:3000/reset-password/${user._id}/${token}`
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
