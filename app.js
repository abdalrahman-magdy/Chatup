process.on('uncaughtException',()=>{
    console.log("error in code");    
})
import { db } from './database/dbconnection.js';
import express from 'express'
import userRouter from './src/modules/user/user.routes.js'
import { appError } from './src/utils/appError.js'
import { globalErrorHandler } from './src/middleware/globalErrorHandler.js'
import messageRouter from './src/modules/message/message.routes.js';
import { sendEmail } from './src/emails/email.js';

const app = express()
const port = 3000

// sendEmail("abdoshebr86@gmail.com")

app.use(express.json())

app.use('/users', userRouter)
app.use('/messages', messageRouter)


app.use('*',(req,res,next)=>{
    next(new appError(`path not found ${req.originalUrl}`,404))
} )

app.use(globalErrorHandler)





process.on('unhandledRejection',(err)=>{
    console.log('unhandled error', err);    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))