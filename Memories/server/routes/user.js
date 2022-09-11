import express from "express";
import {signin,signup  } from "../controllers/user.js";

const path  = express.Router();
path.post("/signin",signin);
path.post("/signup",signup);

export default path;