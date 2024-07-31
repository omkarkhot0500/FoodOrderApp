import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'        // Now env file will be included in project
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//  app config
const app = express()  // app can use all the powers of express
const port =4000

// Middleware
app.use(express.json()) // when we get request from frontend to backend this will be passed using this json
app.use(cors()) // Using this we can assess backend form frontend


// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);    //  Whenever a client makes a request to a URL starting with /api/food, Express will pass the request to the foodRouter for further handling.
app.use("/images",express.static('uploads'))    //  The express.static() middleware serves static files (such as images, CSS, JavaScript) from a specified directory.
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res) =>{
    res.send("API Working")
} )


app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


