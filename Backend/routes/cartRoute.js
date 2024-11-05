import express from 'express'

import { addTOCart,removeFromCart,getCart } from '../controllers/cartController.js'
import authMiddlewere from '../middleware/auth.js';

const cartRouter=express.Router()

cartRouter.post("/add", authMiddlewere,addTOCart);
cartRouter.post("/remove", authMiddlewere,removeFromCart);
cartRouter.post("/get", authMiddlewere,getCart);


export default cartRouter;
