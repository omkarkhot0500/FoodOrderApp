import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {


    //   This middleware will take token and decode 
    //   Then it is converted into userId 
    //   Using userID we can  add  , remove , get the data from the cart


    const { token } = req.headers;
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export default authMiddleware;