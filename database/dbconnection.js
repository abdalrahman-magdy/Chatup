import mongoose from "mongoose"

const db = mongoose.connect('mongodb://127.0.0.1:27017/userMessages').then(() => {

    console.log("connected to db");

}).catch((error) => {
    console.error(error);
})
export { db }