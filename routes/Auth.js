import userControllers from "../controllers/Auth.js";
import express from "express";
const authRouter = express.Router();


authRouter.post('/singUp', userControllers.signUp);
authRouter.post('/login', userControllers.login);
authRouter.post('/verify', userControllers.validateOtp);
authRouter.post('/forgotPassword', userControllers.forgotPassword);
authRouter.post('/reset', userControllers.resetPassword);
authRouter.delete('/delete/:id', userControllers.deleteUser);

export default authRouter;