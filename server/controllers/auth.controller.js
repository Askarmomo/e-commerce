import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"

// generate jwt tokens
const generateTokens = (userId) => {

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" })
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, { expiresIn: "15m" })

    return { refreshToken, accessToken }
}

// set jwt tokens to req.cookie
const setCookies = (res, accessToken, refreshToken) => {

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        smaeSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        smaeSite: "strict",
        secure: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    })
}

export const singUp = async (req, res) => {

    const { username, email, password } = req.body

    try {

        const exitUser = await User.findOne({ email })

        if (exitUser) {
            return res.status(400).json({ error: "user already exist" })
        }

        if (password) {
            const slat = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, slat)

            const user = await User.create({
                username,
                email,
                password: hashPassword,
                profilePic: `https://avatar.iran.liara.run/username?username=${username}`
            })

            if (user) {

                const { accessToken, refreshToken } = generateTokens(user._id)
                setCookies(res, accessToken, refreshToken)
            }

            res.status(200).json({
                address: user.address,
                cartItems: user.cartItems,
                email: user.email,
                orders: user.orders,
                role: user.role,
                username: user.username,
                watchList: user.watchList,
                profilePic: user.profilePic
            })
        }




    } catch (error) {
        console.log("Error in singUp", error.message);
        res.status(400).json({ error: "Internal server error" })

    }

}

export const logIn = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })


        if (user && (await user.comparePassword(password))) {

            const { refreshToken, accessToken } = generateTokens(user._id)
            setCookies(res, accessToken, refreshToken)

            return res.status(201).json({
                address: user.address,
                profilePic: user.profilePic,
                cartItems: user.cartItems,
                email: user.email,
                orders: user.orders,
                role: user.role,
                username: user.username,
                watchList: user.watchList
            })

        } else {
            return res.status(400).json({ error: "Invalid email or password" })
        }

    } catch (error) {
        console.log("Error in logIn", error.message);
        res.status(400).json({ error: "Internal server error" })
    }
}

export const logOut = async (req, res) => {

    try {
        res.clearCookie("refreshToken")
        res.clearCookie("accessToken")

        res.status(200).json({ message: "logout suceessfully" })
    } catch (error) {
        console.log("Error in logOut", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const refreshTokens = async (req, res) => {

    try {
        const refreshToken = req.cookies.refreshToken


        if (!refreshToken) {
            return res.status(400).json({ message: "invalid refresh token" })
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            smaeSite: "strict",
            maxAge: 15 * 60 * 1000
        })

        res.status(200).json({ message: "Token refreshed successfully" })


    } catch (error) {
        console.log("Error  in refreshToken" + error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const updateProfile = async (req, res) => {

    const id = req.user._id
    const { username, email, currentPassword } = req.body
    let { newPassword, profilePic } = req.body

    if (currentPassword == 'undefined' && newPassword == 'undefined') {
        currentPassword = null
        newPassword = null
    }

    try {

        const user = await User.findById({ _id: id })

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        let newCreatedPassword;
        const isCurrentPassword = await bcrypt.compare(currentPassword, user.password)
        if (currentPassword && isCurrentPassword) {


            if (isCurrentPassword) {
                if (newPassword) {
                    const salt = await bcrypt.genSalt(10)
                    newCreatedPassword = await bcrypt.hash(newPassword, salt)
                }
            } else {
                return res.status(200).json({ error: "current password not match" })

            }

            user.username = username || user.username
            user.email = email || user.email
            user.password = newCreatedPassword || user.password
            user.profilePic = profilePic || user.profilePic

            await user.save()

            return res.status(200).json(user)
        } else {
            res.status(400).json({ error: 'current password do not match' })

        }

        if (user.profilePic != profilePic) {
            await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            const uploaderResponse = cloudinary.uploader.upload(profilePic)
            profilePic = (await uploaderResponse).secure_url
        }


    } catch (error) {
        console.log("Error in updateProfile", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const getUserProfile = async (req, res) => {

    const userId = req.user._id
    try {

        const user = await User.findById(userId).select('-password')

        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }

        res.status(200).json(user)

    } catch (error) {
        console.log("Error in getUserProfile", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const accountDetailes = async (req, res) => {

    const userId = req.user._id
    try {

        const user = await User.findById(userId).select("-_id")

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        res.status(200).json(user)

    } catch (error) {
        console.log("Error in accountDetailes", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const updateAddress = async (req, res) => {

    const { country, city, address, postelCode, landMark } = req.body
    const userId = req.user._id
    try {

        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json("pls Logoin")
        }

        user.address.address = address || user.address.address,
            user.address.country = country || user.address.country,
            user.address.city = city || user.address.city,
            user.address.postelCode = postelCode || user.address.postelCode,
            user.address.landMark = landMark || user.address.landMark,

            await user.save()

        res.status(200).json(user.address)

    } catch (error) {
        console.log("Error in updateAddress", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const getAllUsers = async (req, res) => {

    const admin = req.user.role == "admin"
    try {
        if (!admin) {
            return res.status(400).json({ message: "admin can access this route" })
        }
        const allUsers = await User.find()

        res.status(200).json(allUsers)
    } catch (error) {
        console.log("Error in getAllUsers", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const getUserCount = async (req, res) => {

    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers.length)
    } catch (error) {
        console.log("Error in getUserCount", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const getAddress = async (req, res) => {

    const user = req.user
    try {
        res.status(200).json(user.address)

    } catch (error) {
        console.log('Error in getAddress', error.message);
        res.status(500).json({ error: 'Internal server error' })
    }

}

export const deleteUser = async (req, res) => {
    const user = req.user
    const { id } = req.params

    try {

        if (user.role === "admin") {
            if (id !== user._id.toString()) {
                await User.findByIdAndDelete({ _id: id })
                const allUsers = await User.find()
                res.status(200).json(allUsers)
            } else {
                res.status(400).json({ error: 'you cannot delete admin' })
            }

        } else {
            res.status(400).json({ error: "only admin can delete user" })
        }

    } catch (error) {
        console.log('Error in deleteUser', error.message);
        res.status(500).json({ error: 'Internal server error' })
    }

}