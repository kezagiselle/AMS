import userControllers from "../controllers/Auth.js";
import allValidations from "../utilis/validation.js";
import express from "express";
const authRouter = express.Router();


authRouter.post('/signUp',allValidations.signUpValidation, userControllers.signUp);
authRouter.post('/login', allValidations.signInValidation,userControllers.login);
authRouter.post('/verify', allValidations.otpValidation,userControllers.validateOtp);
authRouter.post('/forgotPassword', allValidations.forgotPasswordValidation,userControllers.forgotPassword);
authRouter.post('/reset', allValidations.resetPasswordValidation,userControllers.resetPassword);
authRouter.post('/logout', allValidations.logoutValidation,userControllers.logout);
authRouter.delete('/delete/:id', allValidations.deleteUser,userControllers.deleteUser);

export default authRouter;