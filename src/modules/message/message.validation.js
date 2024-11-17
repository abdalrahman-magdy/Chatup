import joi from "joi"

const messageVal = joi.object({
    content: joi.string().min(1).max(1000),
    receiverId: joi.string().hex().length(24).required().id()
})
export { messageVal}