import userModel from "../../../../DB/model/User.model.js";
import { generateToken, verifyToken } from "../../../Services/generateAndVerifyToken.js";
import { hash , compare} from "../../../Services/hashAndCompare.js";
import { sendEmail } from "../../../Services/sendEmail.js";

export const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "email already exists" });
    }
    const hashPassword = hash(password);
    const token = generateToken({email},process.env.EMAIL_TOKEN);
    const link = `http://localhost:3000/auth/confirmEmail/${token}` ;
    await sendEmail(email,"confirm email",`<a href="${link}">verify your email</a>`)
    const createUser = await userModel.create({
      UserName:userName,
      email,
      password: hashPassword,
    });
    return res.status(201).json({ message: "Done", user: createUser });
};
export const confirmEmail = async(req,res)=>{
   const {token} = req.params;
   const decoded= verifyToken(token,process.env.EMAIL_TOKEN);
   const user = await userModel.updateOne({email : decoded.email},{confirmEmail : true})
   return res.json({messsage:"Your email is confirmed , you can login"});
}
export const login = async(req,res)=>{
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"email doesn't exist"})
    }else{
        if(!user.confirmEmail){
            return res.json({message:"please verify your email"});
        }
        const match = compare(password,user.password);
        if(!match){
            return res.json({message:"password is not correct"})
        }else{
            const token = generateToken({id:user._id})
            return res.status(200).json({message:"Done",token})
        }
    }   
}


