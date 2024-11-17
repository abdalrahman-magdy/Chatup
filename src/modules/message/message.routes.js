import { Router } from "express";
import { messageVal } from "./message.validation.js";
import { validate } from "../../middleware/validate.js";
import { createMessage, deleteMessage, readAllMessages } from "./message.controller.js";
const messageRouter = Router()


messageRouter.post("/create-message",validate(messageVal),createMessage)
messageRouter.get("/get-all-messages",readAllMessages)
messageRouter.delete("/delete-message/:messageId",deleteMessage)



export default messageRouter