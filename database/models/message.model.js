import mongoose,{Schema, model} from "mongoose"

const schema = new Schema({
    content: {type: String, require:true},
    receiverId:{type: mongoose.Types.ObjectId, ref:"User"}
},{
    versionKey:false
})

export const Message = model('Message', schema)