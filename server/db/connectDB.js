import mongoose from "mongoose"

const connectDB = () =>{
    mongoose.connect(process.env.DATABASE,{autoIndex:true})
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch(err =>{
        console.log("error:", err.message)
    })
}
export default connectDB;