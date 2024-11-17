
import {Schema, model} from "mongoose"

const schema = new Schema({
    userName: {type: String, require:true},
    email:{type: String, require:true},
    password:{type: String, require:true},
    otpCode: String,
    otpExpire:Date,
    verified:{type:Boolean,default:false}

},{
    versionKey:false
})

export const User = model('User', schema)