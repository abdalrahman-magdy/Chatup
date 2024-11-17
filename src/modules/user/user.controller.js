import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../../emails/email.js";
import moment from "moment/moment.js";
import bcrypt from "bcrypt"
import { appError } from "../../utils/appError.js";

const signUp = catchError(async (req, res, next) => {
    const { userName, email, password } = req.body

    const otp = Math.floor((Math.random() * 1000000) + 1)

    catchError(sendEmail(email, otp))

    const otpExpire = moment().add(15, "minute")

    req.body.password = bcrypt.hashSync(password, 8)
    req.body = { userName, email, password, otpCode: otp, otpExpire }
    const addedUser = await User.insertMany(req.body)
    addedUser[0].password = undefined

    res.status(201).json({
        message: "user Added, please enter the otp code to verify email",
        success: true, Data: addedUser
    })

})

const verifyOtp = catchError(async (req, res, next) => {
    jwt.verify(req.params.token, 'thisIsASecretKey', async (err, decoded) => {
        
        if(err)next(new appError(err,409))
        let { otp, email } = decoded
    
        const user = await User.findOne({ email })
        if(!user)next(new appError('signup first',404))


        if (user.otpCode != otp)
            
            next(new appError("invalid OTP", 409))
        if (user.otpExpire < moment()) {

            const otp = Math.floor((Math.random() * 1000000) + 1)

            sendEmail(email, otp)

            const otpExpire = moment().add(15, "minute")
            await User.findOneAndUpdate({ email }, { otpCode: otp, otpExpire })
            next(new appError("Otp expired, resending...", 409))
        }
        
        const verifiedUser = await User.findOneAndUpdate({ email:decoded.email }, { verified: true },{new:true})

        return res.status(200).json({ message: "email verified✅", success: true, Data: verifiedUser })

    })

})
const login = catchError(async (req, res, next) => {

    let user = await User.findOne({ email: req.body.email })
    console.log(user);


    if (!user || !bcrypt.compare(req.body.password, user.password))
        return res.status(404).json({ message: "incorrect email or password", success: false })

    jwt.sign({ userId: user._id, name: user.userName , verified: user.verified }, 'thisIsAVeryHardSecretKey', (err, token) => {
        res.status(200).json({ message: "login successful", success: true, token })
    })

})

export { signUp, verifyOtp, login }