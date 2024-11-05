import mongoose from 'mongoose'


const userSchema=new mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String ,required:true, unique:true},
    password:{type:String ,required:true},
    cartData:{type:Object ,default:{}}

},{minimize:false})
//minimize:false means cardata will be craeted without any data bcz we add empty object in card

const userModel=mongoose.model.user || mongoose.model('user',userSchema);

export default userModel;
