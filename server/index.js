import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import logger from 'morgan';

import dashboardRoutes from '../server/routes/dashboard.js';
import authRoutes from '../server/routes/auth.js';
import reportRoutes from '../server/routes/reports.js';
import masterRoutes from '../server/routes/master.js';
import userRoutes from '../server/routes/users.js';
import graphRoutes from '../server/routes/graphs.js';

const app = express();

//To unblock requests
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

//Allow data to be sent in json format
app.use(express.json());

//To block requests from unknow URLs
const allowedOrigins = [  
    "http://localhost:5176"
    // Add more origins if needed
];

app.use(cors({
    origin:allowedOrigins
}));

//To log all requests
app.use(logger('dev'));

//To parse cookies
app.use(cookieParser());

app.use('/api/v1/', dashboardRoutes);
app.use('/api/v1/login',authRoutes);
app.use('/api/v1/reports',reportRoutes);
app.use('/api/v1/masterData',masterRoutes);
app.use('/api/v1/userList',userRoutes);
app.use('/api/v1/graphData',graphRoutes)

app.listen(3000, () => {
    console.log("Server started")
})