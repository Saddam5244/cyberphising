 const joi = require('joi');

 const registerValidation = (req,res, next) =>{
    const Schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(10).max(100).required(),
        phone: joi.string().min(10).required(),
        sex: joi.string().valid("Male", "Female", "Other").required(),
        language: joi.string().required(),
        address: joi.string().min(5).required()
    });
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message: error.details[0].message});
    }
    next();
 }

 const loginValidation = (req,res, next) =>{
    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(10).max(100).required()
    });
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message: error.details[0].message});
    }
    next();
 }

 module.exports = {
    registerValidation,
    loginValidation
 }