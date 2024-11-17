import { User } from "../../database/models/user.model.js";
import { appError } from "../utils/appError.js";
import { catchError } from "./catchError.js";

export const checkEmail = catchError(async (req, res, next) => {
    let exists = await User.findOne({ email: req.body.email })


    if (exists) {next (new appError("email already exists", 409))}

    next()
}
)