import tokenControllers from "../controllers/token.js";
import express from "express";
const tokenRouter = express.Router();

tokenRouter.post('/add', tokenControllers.addToken);
tokenRouter.get('/getAll', tokenControllers.getAllTokens);
tokenRouter.get('/getByUser/:user', tokenControllers.findByUser);
tokenRouter.delete('/delete/:id', tokenControllers.deleteToken)

export default tokenRouter;
