import { appError } from "../utils/appError.js"


export const validate = (valSchema) => {
    return (req, res, next) => {
        let { error } = valSchema.validate({...req.body,...req.params,...req.query}, { abortEarly: false })

        if (!error) {
            next()
        }
        else {
            let errors = error.details.map(err => error.message)
            next(new appError(errors,422))
        }
    }
}