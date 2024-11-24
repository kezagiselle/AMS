import mongoose from "mongoose";
import {model, Schema} from 'mongoose';

const userSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ['lecture', 'student'],
    },
    otp: {
        type: Number,
        required: true
    },
    otpExpires: {
        type: Date,
        required: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});
const userModel = mongoose.model('user', userSchema);
export default userModel;