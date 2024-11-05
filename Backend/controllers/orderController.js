import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import 'dotenv/config'
// order and payment api


//connect only stripe secret key but this time i don't have scret key. I have to add just scret key and all code work properly

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend
const placeOrder = async (req, res)=>{
    
    // const frontend_url="http://localhost:5173"
    
    const frontend_url="http://localhost:5174"

try {
    const newOrder= new orderModel({
     userId:req.body.userId,
     items: req.body.items,
     amount:req.body.amount,
     address:req.body.address,
    })
    await newOrder.save();
    
    //after placing order clear user cart
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})


    //create payment link using stripe
    const line_items=req.body.items.map((item)=>({
        price_data:{
        currency:"pkr",
        product_data:{
            name:item.name
        },
        unit_amount:item.price*100*277
      },
      quantity:item.quantity
    }))
    //push delivery charages
    line_items.push({
        price_data:{
        currency:"pkr",
        product_data:{
            name:"Delivery charges"
        },
        unit_amount:2*100*277
      },
      quantity:1

    })

    const session= await stripe.checkout.sessions.create({
        line_items:line_items,
        mode: "payment",
        // logic if the payment suucess or fail and redirect user
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,

        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    res.json({success:true,session_url:session.url})

} catch (error) {
   console.log(error)
   res.json({success:false,message:"Error"})
}
}

//verify order
const verifyOrder= async (req,res)=>{
    const {orderId, success}=req.body;
    try {

        if(success="true")
            {
               await orderModel.findByIdAndUpdate(orderId,{payment:true})
               res.json({success:true, message:"paid"});
            }
           //  cancel order
            else{
               await orderModel.findByIdAndDelete(orderId);
               res.json({success:false, message:"Not paid"});
            }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"});
    }
}


    // display userorder on frontend through api

    const userOrders = async (req, res) =>{
   try {
    
    const orders=await orderModel.find({userId:req.body.userId})
   res.json({success:true, data:orders})
   } catch (error) {
    console.log(error)
    res.json({success:false, message:"Error"})
   }
    }

 //listing orders for admin panel
    const listOrders= async (req, res)=>{
      try {
         const orders = await orderModel.find({})
         res.json({success:true, data:orders})
      } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
      }
    }

 //api for updating order status
  const updateStatus=async (req, res)=>{
      try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true, message:"status updated"
        })
      } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"
        })
      }
  }

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}
