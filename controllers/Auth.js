import userModel from "../models/Auth.js";
import NotFoundError from "../Errors/NotFoundError.js";
import BadRequestError from "../Errors/BadRequest.js";
import Token from '../models/token.js';
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";
import sendEmail from "../utilis/sendEmail.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import otpGenerator from "../utilis/otp.js";

const signUp = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    };
    const foundUser = await userModel.findOne({email: req.body.email});
    if(foundUser){
        return next(new BadRequestError('Email is already in use'));
    };
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime() + (60 * 1000 * 5)

    const newUser = await userModel.create({
        names: req.body.names,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        otp: otp,
        otpExpires: otpExpirationDate
    });
    const savedUser = await newUser.save();
    sendEmail(req.body.email, 'verify your account', `Your otp is ${otp}`);
    if(savedUser){
        return res.status(201).json({
            message: 'User account created!',
            user: savedUser
        });
    }
});

const login = asyncWrapper(async (req, res, next) =>{
    //validate the input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    };
    const user = await userModel.findOne({email: req.body.email});
    if(!user){
        return next(new BadRequestError('Invalid email or password'));
    };
    //Check if the account is verified
    if(!foundUser.verified){
        return next(new BadRequestError('Your account is verified!'))
    };
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordValid){
        return next(new BadRequestError('Invalid email or password'));
    };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
        message: 'Logged in successfully!',
        token
    });
});

const validateOtp = asyncWrapper(async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg))
    }
    //checking if the given otp is stored in database
    const foundUser = await userModel.findOne({otp: req.body.otp})
    if(!foundUser){
        return next(new BadRequestError('Invalid OTP'))
    };
    //Updating a user to be verified
    foundUser.verified = true;
    const savedUser = await foundUser.save();
    if(savedUser){
        return res.status(201).json({
            message: 'Account verified successfully',
            user: savedUser
        })
    }
});

const forgotPassword = asyncWrapper(async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    //find user
    const foundUser = await userModel.findOne({email: req.body.email});
    if(!foundUser){
        return next(new BadRequestError('Your email is not found'));
    }
    //generate token
    const token = jwt.sign({id: foundUser.id }, process.env.JWT_SECRET, {expiresIn: '24h'});

    //create token record and send email
    try{
        //save token to the database
        await Token.create({
            token: token,
            user: foundUser._id,
            expirationDate: new Date().getTime() + (60 * 1000 * 30)
        });
        //send email with reset link
        const link = `http://localhost:2000/reset-password?token=${token}&id=${foundUser.id}`;
        const emailBody = `Click on the link below to reset your password:\n\n${link}`;

        await sendEmail(req.body.email, "Reset your password", emailBody);

        //send success response
        res.status(200).json({
            message: "We sent a reset password link to your email"  
        });
    }catch(error){
        return next(new Error('Failed to send reset email or save token to the database'));
    }
});

const resetPassword = asyncWrapper(async (req, res, next) => {
    const { token, id, password} = req.body;
    //validate input
    if(!token || !id || !password){
        return next(new BadRequestError('Token, id and new password are required'));
    }
    //verify token
    const foundToken = await Token.findOne({token});
    if(!foundToken){
        return next(new BadRequestError("Invalid password or email"))
    }
    //update user's password
    foundToken.password = password;
    await foundToken.save();

    //delete the token from the database
    await Token.deleteOne({token});
    res.status(200).json({
        message: "password reset successfully"
    })
});

const deleteUser = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if(!user){
        return next(new NotFoundError(`No user with this Id ${id}`, 404));
    }
    res.status(200).json({message: 'user deleted successfully'});
});

const userControllers = {
    signUp,
    login,
    validateOtp,
    forgotPassword,
    resetPassword,
    deleteUser
};
export default userControllers;