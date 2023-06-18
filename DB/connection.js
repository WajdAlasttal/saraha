import mongoose from "mongoose";
const connectDb = async()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log("connect DB");
    })
    .catch((err)=>{
        console.log(`error to connect to DB ${err}`);
    })
}
export default connectDb;