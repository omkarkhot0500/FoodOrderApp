import express from "express"
import { addFood , listFood,removeFood} from "../controllers/foodController.js"
import multer from "multer"   //  It is used  to create image storage system


//  The express.Router() function is used to create a new router object in an Express application.
const foodRouter = express.Router();



//Image Storage Engine

const storage = multer.diskStorage({
    destination:"uploads",       //The destination property specifies the directory where uploaded files will be saved
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)    // This is to assign a name to each image where as it should be unique so we used data.now()
    }
})



// Middleware is create to upload image to uploads folder 
const upload = multer({storage:storage})



foodRouter.post("/add",upload.single("image"),addFood)   //.single("image") says, “Hey, Multer, expect only one file, and it should come from a field named ‘image’ in the form.”
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;