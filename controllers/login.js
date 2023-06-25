const async_wrapper = require("../middleware/async_wrapper");
const emailValidator = require('deep-email-validator');
const USER = require('../models/user');
const customError = require("../errors/custom-error");
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const generateJwtToken = require("../utils/generateJWT");


const login = async_wrapper(async(req,res)=>{
    const {email,password} = req.body;
    const validEmail = await emailValidator.validate(email);
    const userFound = await USER.findOne({email:email});
    if(!validEmail){
        throw new customError("invalid email address",StatusCodes.NOT_FOUND);
    }
    if(!userFound){
        throw new customError("user not registered",StatusCodes.FORBIDDEN);
    }
    if(userFound.pass_hash==(null||undefined)){
        throw new customError("user not registered",StatusCodes.FORBIDDEN);
    }
    const isvalidPassword = await bcrypt.compare(password,userFound.pass_hash);
    if(!isvalidPassword){
        throw new customError("invalid password",StatusCodes.FORBIDDEN);
    }
    const user={
        email:email
        //more fields can be added
    }
    const token = generateJwtToken(user);
    //console.log(token);
    res.cookie('token',token).json({msg: "successful login and jwt token sent"});
})

module.exports = login;