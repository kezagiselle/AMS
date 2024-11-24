import authRouter from "./Auth.js";
import tokenRouter from "./token.js";
import authorizationRouter from "./authorization.js";
import lectureRouter from "./lecture.js";
import express from "express";
const Router = express.Router();

Router.use('/users', authRouter);
Router.use('/tokens', tokenRouter);
Router.use('/authorizations', authorizationRouter);
Router.use('/students', lectureRouter);
export default Router;
