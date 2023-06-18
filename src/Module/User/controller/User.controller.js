import userModel from "../../../../DB/model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";

export const profile = (req,res)=>{
   return res.json({message:req.id}) 
}
export const profilePic =async(req,res)=>{
   if(!req.file){
      return res.status(400).json({messsaga:"file is required"})
   }
   const {secure_url} =await cloudinary.uploader.upload(req.file.path,{folder:`saraha/user/${req.id}`})
   const user = await userModel.updateOne({_id:req.id},{profilePic:secure_url})
   return res.status(200).json({message:"profile file updated successfully"})
}