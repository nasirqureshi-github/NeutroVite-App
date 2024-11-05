//athutication api

import express from 'express'
import { loginUser, registerUser } from '../controllers/userControllers.js'


const userRouter=express.Router()

//we need data (email, ps etc) of the user to create the user

userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)

export default userRouter;
