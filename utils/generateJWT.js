const jwt = require('jsonwebtoken');
require('dotenv').config();


const generateJwtToken = (payload)=>{
    const options = {
        expiresIn: '30d' // Token expiration time
      };
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,options);
}

module.exports = generateJwtToken;