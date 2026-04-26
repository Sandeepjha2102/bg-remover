import { Webhook } from "svix";
import userModel from "../models/userModel.js"
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

// ---------------- Clerk Webhook ----------------
const clerkWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { type, data } = req.body;

        switch (type) {
            case "user.created":
                await userModel.create({
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                });
                break;

            case "user.updated":
                await userModel.findOneAndUpdate(
                    { clerkId: data.id },
                    {
                        email: data.email_addresses[0].email_address,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        photo: data.image_url
                    }
                );
                break;

            case "user.deleted":
                await userModel.findOneAndDelete({
                    clerkId: data.id
                });
                break;

            default:
                break;
        }

        res.json({ success: true });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// ---------------- User Credits ----------------
const userCredits = async (req, res) => {
    try {
        const clerkId = req.clerkId;

        const userData = await userModel.findOne({ clerkId });

        res.json({
            success: true,
            credits: userData.creditBalance
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// ---------------- Razorpay Instance ----------------
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ---------------- Create Payment ----------------
const paymentRazorpay = async (req, res) => {
    try {
        const { clerkId, planId } = req.body;

        const userData = await userModel.findOne({ clerkId });

        if (!userData || !planId) {
            return res.json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        let credits, plan, amount;

        switch (planId) {
            case "Basic":
                plan = "Basic";
                credits = 100;
                amount = 10;
                break;

            case "Business":
                plan = "Business";
                credits = 500;
                amount = 50;
                break;

            case "Enterprise":
                plan = "Enterprise";
                credits = 5000;
                amount = 250;
                break;

            default:
                return res.json({
                    success: false,
                    message: "Invalid Plan"
                });
        }

        // Save transaction
        const newTransaction = await transactionModel.create({
            clerkId,
            plan,
            amount,
            credits,
            payment: false,
            date: Date.now()
        });

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString()
        };

        const order = await razorpayInstance.orders.create(options);

        res.json({
            success: true,
            order
        });

    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// ---------------- Verify Payment ----------------
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        // FIXED: orders.fetch()
        const orderInfo = await razorpayInstance.orders.fetch(
            razorpay_order_id
        );

        if (orderInfo.status !== "paid") {
            return res.json({
                success: false,
                message: "Payment not completed"
            });
        }

        const transactionData = await transactionModel.findById(
            orderInfo.receipt
        );

        if (!transactionData) {
            return res.json({
                success: false,
                message: "Transaction not found"
            });
        }

        if (transactionData.payment) {
            return res.json({
                success: false,
                message: "Payment already verified"
            });
        }

        const userData = await userModel.findOne({
            clerkId: transactionData.clerkId
        });

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // Add credits
        await userModel.findByIdAndUpdate(
            userData._id,
            {
                creditBalance:
                    userData.creditBalance + transactionData.credits
            }
        );

        // Mark transaction paid
        await transactionModel.findByIdAndUpdate(
            transactionData._id,
            {
                payment: true
            }
        );

        res.json({
            success: true,
            message: "Credit Added Successfully"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export {
    clerkWebhook,
    userCredits,
    paymentRazorpay,
    verifyRazorpay
};