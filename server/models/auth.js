import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String },
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now },
    loginDetails: [{
        browser: { type: String, required: true },
        os: { type: String, required: true },
        deviceType: { type: String, required: true },
        ipAddress: { type: String, required: true },
        loginTime: { type: Date, default: Date.now }
    }]
})

export default mongoose.model("User", userSchema)
