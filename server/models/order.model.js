import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({

    orderId: {
        type: Number,
        required: [true, 'orderId must']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "userId is required"]
    },
    products: [
        {
            image: {
                type: String,
                required: [true, "image is required"]
            },
            name: {
                type: String,
                required: [true, "name is required"]
            },
            quantity: {
                type: Number,
                required: [true, "name is required"],
            },
            address: {
                type: String,
                required: [true, "address is required"]
            },
            price: {
                type: String,
                required: [true, "price is required"]
            }

        }
    ],
    totalPrice: {
        type: String,
        required: [true, " totalPrice is required"]
    },
    sessionId: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        default: "Process",
        enum: ["Process", "Delivered", "Shiped", "Pending"]
    }

}, { timestamps: true })

const Order = mongoose.model("order", orderSchema)

export default Order