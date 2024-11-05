// craete api to strore food items

import foodModel from "../models/foodModel.js";
//use pre build node.js pakage file sytem
import fs from 'fs'
//add food item  
const addFood=async(req, res)=>{
 
    //   const imageUrl = req.file.path; 

 
// let image_filename=`${req.file.filename}`;

// Get Cloudinary URL
let imageUrl = req.file.path; // This is the URL from Cloudinary


//use foodModel to create documents
// when we call the api we will get these details from  addFood function
const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:imageUrl
})

try {
     //save food to the database
        console.log("Data inserted successfully");
await food.save();
res.json({success:true,message:"Food Added"})
} catch (error) {
    console.log(error);
 res.json({success:false, message:"Error"})
}

}

//list all food (api end point)

const listFood=async(req, res)=>{
try {
    const foods= await foodModel.find({})
    res.json({success:true,data:foods})
} catch (error) {
    console.log(error);
    res.json({success:true,message:"Error"})
}
}

//remove food item from database
const removeFood=async (req,res)=>{
try {
    // find item in the database
    const food= await foodModel.findById(req.body.id)
    //delete image from the folder
    fs.unlink(`uploads/${food.image}`,()=>{})
    //delete items from database
   await foodModel.findByIdAndDelete(req.body.id)
   res.json({success:true, message:"Food Removed"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}


export {addFood,listFood,removeFood};