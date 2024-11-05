import userModel from "../models/userModel.js";
//jwt use for user authitication
import jwt from 'jsonwebtoken';

//bcrypt use for user encrypt data
import bcrypt from 'bcrypt'

//use for data validatison such as email , password etc
import validator from "validator";




//login user
const loginUser=async (req,res)=>{
const {email,password}=req.body;
   try {
    const user= await userModel.findOne({email})  

    if(!user){
    return res.json({success:false, message:"User Doesn't exist"})
    }
    
    //login that user if cradential match

    //password= user input password while login
    //user.password= check password in dbs
    const isMatch= await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return  res.json({success:false, message:"Invalid credentional"})
    }

    //if password match
     
    const token=createToken(user._id );
    return res.json({success:true, token})

   } catch (error) {
    console.log(error);
   return res.json({success:false, message: "Error"})
   }
}

//craete user jwt token
//jwt token is used to craete a token for user when they login and verify that user
//id comes fron dbs
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//Register user
const registerUser=async (req,res)=>{
//destrurte user name, password ,email

const { name , password,email}=req.body;

try {
    //checking is user already exist
    const exists=await userModel.findOne({email}) 
    if(exists){
     return res.json({success:false, message:'user already exist'})
    }
   
    //validating eamil format and strong passoward.


   if(!validator.isEmail(email)){
    return res.json({
    success:false, message:'please enter valid email'
    })
   }

   //check passowrd length and craete strong password

   if(password.length<8){
    return res.json({
        success:false, message:'please enter strong password'
        })
     }


     //encrypt password: to encrypt password we will use bcrypt node pakage

     //hashing user passowrd

     //gensalt craete strongest and unique password according to number
     const salt= await bcrypt.genSalt(10)
     
     const hashePassword=await bcrypt.hash(password, salt);

     // if the above code is not execute it means that email and password are valid. in that case we will craete one account

const newUser= new  userModel({
    name :name,
    email:email,
    password:hashePassword
})
const user = await newUser.save();

//generate token
const token=createToken(user._id);
res.json({success:true, token})

} catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
}

}





export {loginUser,registerUser};