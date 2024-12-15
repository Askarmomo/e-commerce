import mongoose from "mongoose";
import bcrypt from "bcryptjs"



const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "name is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profilePic: {
        type: String,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders"
        }
    ],
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
        }
    ],
    address: {
        country: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        postelCode: {
            type: Number,
            default: 0
        },
        address: {
            type: String,
            default: ""
        },
        landMark: {
            type: String,
            default: ""
        }
    },
    watchList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]

})


// comapre client password to dataBase passowrd and it will return true or false
userSchema.methods.comparePassword = async function (password) {

    return bcrypt.compare(password, this.password)

}

const User = mongoose.model('user', userSchema)

export default User