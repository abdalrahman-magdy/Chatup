import joi from "joi"

const signUpVal = joi.object({
    userName: joi.string().required().min(4).max(20),
    email: joi.string().email().required(),
    password: joi.string().required()
})
const loginVal = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
export {signUpVal, loginVal}