import multer from 'multer';
import { nanoid } from 'nanoid';

export const HME =(err,req,res,next)=>{
    if(err){
        return res.status(400).json({message:"multer error",err})
    }else{
        next();
    }
}
function fileUpload(){
    const storage = multer.diskStorage({})
    function fileFilter(req,file,cb){
        if(["image/jpeg","image/png","image/gif"].includes(file.mimetype)){
            cb(null,true)
        }else{
           cb("invalid format",false) 
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}
export default fileUpload;