import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData:{type:Object,default:{}}
}, { minimize: false })  // cartData is empty so it will not show so  Here we add min false then it will show 

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;