import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
})

// Here we are creating Mongoose model named food

//  We add  "||"  beacause  food model exists then it will reuse that model other wise it will create another one
const foodModel = mongoose.models.food ||  mongoose.model("food" , foodSchema);   


export default foodModel;

