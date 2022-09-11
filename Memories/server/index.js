import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/user.js"


const app = express();
dotenv.config();
app.use(express.json({limit : "30mb",extended: true}));
app.use(express.urlencoded({limit : "30mb",extended: true}));
app.use(cors());

// const CONNECTION_URL = "mongodb://localhost:27017/memories"
app.use("/posts",postRoutes)

app.use("/user",userRoutes)

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=> app.listen(PORT,()=> console.log(`server running on:${PORT}`))).catch(
        (error)=> console.log(error.message)
    );