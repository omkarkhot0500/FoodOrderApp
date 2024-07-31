 import mongoose  from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://okhot100:7019310603@cluster0.xnan7gf.mongodb.net/foodmain').then(() => console.log("DB connected"));
 }

