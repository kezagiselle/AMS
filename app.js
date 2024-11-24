import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './DB/connectDB.js';
import Router from './routes/index.js';


const app = express();

// const cors

//middleware
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/Attendance", Router);

// routes
//swagger
const start = async () =>{
    try{
        connectDB();
        app.listen(process.env.PORT, console.log(`Server is listening on ${process.env.PORT}`));
    }catch(error){
        console.log(error);
    }
}
start();