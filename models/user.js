const mongoose= require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    pass_hash: {
        type: String,
        default:null
    }
    //any other fields can be added here
}) 
module.exports = mongoose.model('USER',user); 