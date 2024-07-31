import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})    //  This line will find the particular email in the stored data

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)   // We are passing user id to the createToken function
        res.json({success:true,token})      // This token is sent to the client upon successful login.
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => { 
    const {name, email, password} = req.body;           // Here we are destructuring the info we get from the request method
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})   // He took email bec it is unique ( here he is passing email to findOne from , which he recived from req method)
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){             // It will check whether given email is valid or not
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name:name, email:email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser, registerUser}