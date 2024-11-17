import { Message } from "../../../database/models/message.model.js";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { appError } from "../../utils/appError.js";
import jwt from "jsonwebtoken"

const createMessage = catchError(async (req, res, next) => {
    jwt.verify(req.headers.token, 'thisIsAVeryHardSecretKey', async (err, decoded) => {
        if (err) {
            return next(new appError("Invalid or expired token", 401));
        }
        const { content, receiverId } = req.body

        const receiver = await User.findById(receiverId)
        
        if (!receiver)return next(new appError("User not Found",404))

        const message= await Message.insertMany(req.body)
        

        return res.status(201).json({message:"sent successfully",success:true,Data:message})
    })
})

const readAllMessages = catchError(async (req,res,next)=>{
    if (err) {
        return next(new appError("Invalid or expired token", 401));
    }
    jwt.verify(req.headers.token, 'thisIsAVeryHardSecretKey', async (err, decoded) => {
        
        if(!decoded.verified)return next(new appError("please verify your account to complete this action",409))

        const messages = await Message.find({receiverId:decoded.userId})
        
        return res.status(201).json({message:"sent successfully",success:true,Data:messages})
    })
})

// const deleteMessage = catchError(async (req,res,next)=>{
//     jwt.verify(req.headers.token, 'thisIsAVeryHardSecretKey', async (err, decoded) => {
//         if (err) {
//             return next(new appError("Invalid or expired token", 401));
//         }
//         const {messageId}= req.params
//         if(!decoded.verified)return next(new appError("please verify your account to complete this action",409))

//         const message = await Message.findOneAndDelete({_id:messageId,receiverId:decoded.userId})
//         if(message==null)return next(new appError("message not found,check the messageId",404))
        
        
//         return res.status(204).json({message:"deleted successfully",success:true,Data:message})
//     })
// })
const deleteMessage = catchError(async (req, res, next) => {
    jwt.verify(req.headers.token, 'thisIsAVeryHardSecretKey', async (err, decoded) => {
        if (err) {
            return next(new appError("Invalid or expired token", 401));
        }

        const { messageId } = req.params;
        
        if (!decoded.verified) {
            return next(new appError("Please verify your account to complete this action", 401));
        }

        const message = await Message.findOneAndDelete({ _id: messageId, receiverId: decoded.userId });
        
        if (message === null) {  // Check if the message is null
            return next(new appError("Message not found", 404));
        }
        
        return res.status(200).json({ message: "Deleted successfully", success: true, data: message });
    });
});
export {createMessage,readAllMessages,deleteMessage}