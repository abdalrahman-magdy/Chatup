import nodemailer from "nodemailer"
import { catchError } from "../middleware/catchError.js"
import { emailHtml } from "./emailHtml.js"
import jwt from 'jsonwebtoken'

export const sendEmail = catchError(async (email,otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "abdom87078@gmail.com",
            pass: "qvhqecltgyzvyudx"
        },
    })
    
    jwt.sign({email,otp},'thisIsASecretKey',async (err,token)=>{

        const info = await transporter.sendMail({
        from: '"Abdalrahman Shabrawy" <abdom87078@gmail.com>',
        to: email,
        subject: `verification code`,
        html:emailHtml(email,otp)
        })
        console.log("email sent", info.messageId, token);

    })
    
})