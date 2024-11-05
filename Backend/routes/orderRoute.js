import express from 'express'
import authMiddlewere from '../middleware/auth.js';
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';



const OrderRouter=express.Router();


OrderRouter.post("/place", authMiddlewere, placeOrder);
OrderRouter.post("/verify", verifyOrder);
OrderRouter.post("/userorders",authMiddlewere, userOrders);
OrderRouter.post("/status", updateStatus);

OrderRouter.get("/list",listOrders)

export default OrderRouter;