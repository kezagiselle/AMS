import authorization from "../middleware/authorization.js";
import express from 'express';
const authorizationRouter = express.Router();

authorizationRouter.post('/admin', (req, res, next) => {
    req.body.role = 'lecture'; // Ensure you specify the required role for the route
    next();
}, authorization.roleAuthorization, (req, res) => {
    // Logic for the route after passing roleAuthorization
    res.status(200).json({ message: 'Action performed successfully' });
});

authorizationRouter.post('/user', (req, res, next) => {
    req.body.role = 'student'; // Required role for this route
    next();
}, authorization.roleAuthorization, (req, res) => {
    res.status(200).json({ message: 'User action executed successfully' });
});

export default authorizationRouter;
