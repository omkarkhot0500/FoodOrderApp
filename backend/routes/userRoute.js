import express from 'express';
import { loginUser,registerUser } from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);  // Here we are using post method bec we need to get the info from the user so 
userRouter.post("/login",loginUser);

export default userRouter;