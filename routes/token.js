import tokenControllers from "../controllers/token.js";
import express from "express";
const tokenRouter = express.Router();

tokenRouter.post('/add', tokenControllers.addToken);
tokenRouter.get('/getAll', tokenControllers.getAllTokens);
tokenRouter.get('/getById/:id', tokenControllers.findById);
tokenRouter.delete('/delete/:id', tokenControllers.deleteToken)

export default tokenRouter;
