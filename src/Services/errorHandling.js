export const asyncHandler = (fn)=>{
    return (req, res)=>{
        fn(req,res).catch(error=>{
            res.status(500).json({message:"catch error : ", error : error.stack})
        })
    }
} 