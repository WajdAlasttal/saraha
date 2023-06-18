import connectDb from '../../DB/connection.js';
import authRouter from './Auth/Auth.router.js';
import messageRouter from './Message/Message.router.js';
import userRouter from './User/User.router.js';
const initApp = (app , express)=>{
    connectDb();
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.send("hello")
    })
    app.use("/auth",authRouter);
    app.use('/message',messageRouter);
    app.use("/user",userRouter);
    app.use("/*",(req,res)=>{
        return res.status(404).json({message:"Page Not Found"})
    })
}
export default initApp;