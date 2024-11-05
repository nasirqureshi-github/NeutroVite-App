import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import OrderRouter from "./routes/orderRoute.js";

import 'dotenv/config'



//app config
const app=express();
const port= process.env.PORT || 4000;


//middleware
app.use(express.json());
//access backend from frontend
app.use(cors(
  {
    origin: ["https://neutro-vite-frontend.vercel.app",
             "https://neutrovite-admin.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

//database connection
connectDB();


//api endpoints
// food api
app.use("/api/food",foodRouter);

//accss uploaded images on frontend
//images api
app.use('/images',express.static('uploads'))

//user api
app.use('/api/user',userRouter)

// cart api
app.use('/api/cart',cartRouter);

//order api
app.use("/api/order", OrderRouter)

app.get("/" ,(req,res)=>{
res.send("api working");
})



//run server
app.listen(port, (req,res)=>
    console.log(`server started on http://localhost:${port}`))

