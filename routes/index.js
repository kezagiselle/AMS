import authRouter from "./Auth.js";
import tokenRouter from "./token.js";
import express from "express";
const Router = express.Router();

Router.use('/users', authRouter);
Router.use('/tokens', tokenRouter);

export default Router;
