import { Router } from "express";
import { loginVal, signUpVal } from "./user.validation.js";
import { validate } from "../../middleware/validate.js";
import { login, signUp, verifyOtp } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
const userRouter = Router()

userRouter.post("/signup",validate(signUpVal),checkEmail,signUp)
userRouter.post("/verify/:token",verifyOtp)
userRouter.post("/login",validate(loginVal),login)

export default userRouter