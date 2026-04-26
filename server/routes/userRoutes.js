import express from 'express'
import {clerkWebhook, paymentRazorpay, userCredits } from '../controllers/userController.js'
import { authUser } from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhook)
userRouter.get('/credits', authUser, userCredits)
userRouter.post('/pay-razor', authUser, paymentRazorpay)
export default userRouter