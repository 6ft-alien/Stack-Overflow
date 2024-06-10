import mongoose from 'mongoose'
import User from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = []
        allUsers.forEach(users => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn })
        })
        res.status(200).json(allUserDetails);
    }
    catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getLoginHistory = async (req, res) => {

    const { id } = req.params;

    try {

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const allLoginDetail = user.loginDetails.map(record => ({
            _id: record._id,
            browser: record.browser,
            os: record.os,
            deviceType: record.deviceType,
            ipAddress: record.ipAddress,
            loginTime: record.loginTime
        }));
        res.status(200).json(allLoginDetail);
    }
    catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('User unavailable')
    }

    try {
        const updatedProfile = await User.findByIdAndUpdate( _id, { $set: { 'name': name, 'about': about, 'tags': tags }}, { new: true } )
            res.status(200).json(updatedProfile)
    }
    catch(error) {
        res.status(405).json({ message: error.message })
    }
}
