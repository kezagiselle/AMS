import tokenModel from "../models/token.js";
import BadRequestError from "../Errors/BadRequest.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";

const addToken = asyncWrapper(async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    const newToken = await tokenModel.create(req.body);
    return res.status(201).json(newToken);
});

const findByUser = asyncWrapper(async(req,res,next) =>{
    const tokenOwner = req.params.user;

    const foundToken = await tokenModel.findOne({tokenOwner});
    return res.status(200).jsonn({
        foundToken
    });
});

const getAllTokens = asyncWrapper(async(req,res, next) =>{
    const tokens = await tokenModel.find({});
    if(tokens){
        return res.status(200).json({
            nbHits: tokens.length,
            tokens
        })
    }
    res.status(404).json({message: 'No tokens found'});
});

const deleteToken = asyncWrapper(async (req, res, next) => {
    const tokenId = req.params.id;
    const deleteToken = await tokenModel.findByIdAndDelete(tokenId);
    return res.status(200).json({message: 'Token deleted successfully', deleteToken});
});

const tokenControllers = {
    addToken,
    findByUser,
    getAllTokens,
    deleteToken
};
export default tokenControllers;