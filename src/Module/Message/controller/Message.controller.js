import messageModel from "../../../../DB/model/Message.model.js";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../Services/errorHandling.js";

export const sendMessage = asyncHandler(async(req,res)=>{
    const {receiver_id}=req.params;
    const {message} = req.body;
    const user = await userModel.findById(receiver_id);
    if(!user){
        return res.status(404).json({message:"invalid account id"})
    }
    const createMessage= await messageModel.create({
        receiver_id,message
    })
    return res.status(201).json({message:"success"});
 })
 export const getMessage = async(req,res)=>{
    const messagesList = await messageModel.find({
        receiver_id:req.id
    })
    return res.json({message:"Success",messagesList})
 }
 export const deleteMessage = async(req,res)=>{
    const id = req.id ;
    const {messageId}=req.params;
    // return res.json(messageId)
    const message = await messageModel.deleteOne({_id:messageId,receiver_id:id})
    if(message.deletedCount==0){
        return res.status(404).json({message:"invalid user id ot message id"})
    }
    return res.json({message:"success"})
    
 }