const customError = require('../errors/custom-error')
const {StatusCodes,ReasonPhrases}= require('http-status-codes');
const errorHandler = (err,req,res,next)=>{
    if(err instanceof customError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR); 
}

module.exports= errorHandler; 