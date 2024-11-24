import {body} from 'express-validator';

const signUpValidation = [
    body("names", "name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "invalid email").isEmail(),
    body("password", "password is required").not().isEmpty(),
];

const signInValidation = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "invalid email").isEmail(),
    body("password", "password is required").not().isEmpty(),
    body("password", "password is required").not().isEmpty(),
];


const otpValidation = [
    body("otp", "otp must be provided").not().isEmpty()
];

const forgotPasswordValidation = [
    body("email", "Email must be provided").not().isEmpty()
];

const resetPasswordValidation = [
    body("password", "password must be provided").not().isEmpty(),
    body("password", "password should contain atleast 8 characters, uppercase and lower case letters, numbers and symbols").isStrongPassword(),

];

const logoutValidation = [
  body("token", "token must be provided").not().isEmpty(),
];

const deleteUser = [
    body("userId", "userId must be provided").not().isEmpty(),
];

const allValidations = {
    signUpValidation,
    signInValidation,
    otpValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    logoutValidation,
    deleteUser,  
};
export default allValidations;