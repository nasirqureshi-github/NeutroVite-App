// create api to use model 

import express from 'express'
import { addFood,listFood ,removeFood} from "../controllers/foodController.js"
//craete image storage system
import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from 'cloudinary'


//craete foodrouter; using this router we can craete get method, post method etc.
const foodRouter=express.Router();
//image storage Engine
//craete one storage use multer
//date.now function use to give unique name to each file and use with file original name 
// const storage =multer.diskStorage({
//    destination:"uploads" ,
//    filename:(req,file,cb)=>{
//     return cb(null,`${Date.now()} ${file.originalname}`)
//    }
// })




//clodnery storage to store images

cloudinary.v2.config({
   cloud_name: 'dc1ahjwuw',
   api_key: '111987628279476',
   api_secret: 'gacmlBaBbl1Wn9PVWUbflaynYwg'
 });


 // Create Cloudinary storage instance
const storage = new CloudinaryStorage({
   cloudinary: cloudinary.v2,
   params: {
     folder: 'uploads',
     allowedFormats: ['jpeg', 'png', 'jpg'],
     public_id: (req, file) => {
      return `${Date.now()}_${file.originalname}`;
    },
   },
 });
 
 // Create Multer upload instance
//  const upload = multer({ storage: storage });





//use diskstorage to store image in upload folder
const upload=multer({storage:storage})

//use post method to send the data to the server ,data will be process and we will get one response. (example form )

//API endpoints 
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)
export default foodRouter;
