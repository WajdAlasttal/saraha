const dataMethods = ['body','query','params'];
const validation = (schema)=>{
    return (req,res,next)=>{
    const validationArray = [];
    dataMethods.forEach(key=>{
        if(schema[key]){
            const validationResult = schema[key].validate(req[key],{abortEarly:false})
            if(validationResult.error){
                validationArray.push(validationResult.error.details)
            }
        }
    })
    if(validationArray.length > 0){
        return res.json({message:"validati error",validationArray})
    }else{
        return next();
    }
}
}
export default validation;