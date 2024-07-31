import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req,res) => {
 
    let image_filename = `${req.file.filename}`;  // Here we are storing uploaded file name in image_filename which is sent to us from add.js and in add.js we get the input from  a form 

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"hi"})
    }

}


//  all food list

const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});   // Here we are adding all the data containing in foodModel to foods by foodModel.find({}) , which will find all the models in foodModel
        res.json({success:true,data:foods})
    }
    catch (error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove food item

const removeFood = async (req,res) => {

    try{
        const food = await foodModel.findById(req.body.id);  // Now food contains id of the food model which is sent by the req which is written in findId fucn stupid bitch
        fs.unlink(`uploads/${food.image}`,()=>{})    // to unlink===delete the image form uploads

        await foodModel.findByIdAndDelete(req.body.id);  //  await untill image is deleted
        res.json({success:true,message:"Food Removed"}) 
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood}