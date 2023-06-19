const { StatusCodes,ReasonPhrases } = require("http-status-codes");
const customError = require("../errors/custom-error");
const async_wrapper = require("./async_wrapper");
const USER = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticateToken = async_wrapper(async(req,res,next)=>{
    const {token} = req.cookies;
    if(token == null || token==undefined){
        throw new customError(ReasonPhrases.FORBIDDEN,StatusCodes.FORBIDDEN);
    }
    const user = jwt.verify(token,process.env.JWT_SECRET_KEY);
    const ValidUser = await USER.findOne({email:user.email});
    if(!ValidUser){
        throw new customError(ReasonPhrases.FORBIDDEN,StatusCodes.FORBIDDEN);
    }
    req.user = user;
    next();
})

module.exports = authenticateToken;