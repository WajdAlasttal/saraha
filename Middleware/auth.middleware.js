import userModel from "../DB/model/User.model.js";
import { verifyToken } from "../src/Services/generateAndVerifyToken.js";

export const auth = async(req,res,next)=>{
   try{
    const {authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARERKEY)){
        return res.json({message:"invalid bearer key"});  
    }
    const token = authorization.split(process.env.BEARERKEY)[1];
    if(!token){
        return res.json({message:"invalid token"})
    }
    const decoded = verifyToken(token);
    const authUser = await userModel.findById(decoded.id);
    if(!authUser){
        return res.status(401).json({message:"Not registered account"});   
    }
    req.id=decoded.id
    next();
   }catch(err){
    res.json({message:"catch error : ", error : err.stack}) 
   }
}
