const express = require('express');
const connectDB = require('./db/connect');
const router = require('./routes/routes');
const errorHandler = require('./middleware/errorhandler');
const notFound = require('./middleware/notfound');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//routes
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1',router);


app.use(notFound);
app.use(errorHandler);


const start_server = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("connected to the database successfully");
        app.listen(PORT,()=>{console.log(`server is listening on port:${PORT}...`) });
    }catch(err){
        console.log(err);
    }
}

start_server();