import userModel from "../models/userModel.js"

// add to user cart  
const addToCart = async (req, res) => {
   try {
    //   Here we are sending token which is process in middleware and checked with user id if it match or not
    //   If it match then userData will have all the data about that user
      let userData = await userModel.findOne({_id:req.body.userId});
      let cartData = await userData.cartData;   //   Now cart data of particular user is stored in "cartData"
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      else {
         cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});   //  Here we are updating the model which is present in the mongoDb 
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error); 
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      res.json({ success: true, cartData:cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}


export { addToCart, removeFromCart, getCart }