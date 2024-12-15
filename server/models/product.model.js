import mongoose from "mongoose";



const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "pls fill the name"],
        unique: true
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "price required "]
    },
    category: {
        type: String,
        required: [true, "pls fill the category"],
        enum: ["bussiness", "story", "selfhelp"] 
    },
    stock: {
        type: Number,
        required: [true, "pls fill the stock"],
        min: 0
    },
    description: {
        type: String,
        required: [true, "pls fill the description"],
        min: 500
    },
    image: {
        type: String,
        required: [true, " image required"]
    },
    sales: {
        type: Number,
        min: 0,
        default: 0
    }

}, { timestamps: true })

const Product = mongoose.model("product", productSchema)

export default Product