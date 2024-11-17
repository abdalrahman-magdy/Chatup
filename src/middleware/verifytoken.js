import jwt from 'jsonwebtoken'
import { appError } from '../utils/appError.js'

export const verifyToken = (req, res, next) => {
    let { token } = req.headers
    jwt.verify(token, "thisIsAVeryHardSecretKey", async (err, decoded) => {
        if (err) return next(appError('invalid token', 409))

        next()
    })
}