import mongoose from "mongoose";
 
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://nasirqureshi:nasirqureshi2230@cluster0.cd4hoik.mongodb.net/foods-db').then(()=>{
        console.log("database connected"
        )})};