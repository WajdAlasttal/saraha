import joi from 'joi';

export const signupSchema = {
 body:joi.object({
    userName : joi.string().alphanum().min(3).max(20).required().messages({
        'any.required':'username is required',
        'string.empty':'username is empty'
       }),
    email: joi.string().email().required(),
    password: joi.string().required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
 }).required(), 
};

export const loginSchema = {
    body:joi.object({
        email: joi.string().email().required(),
        password:joi.string().required(),
    }).required(),
}
