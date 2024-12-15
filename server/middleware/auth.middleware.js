import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protuctedRoute = async (req, res, next) => {

    try {

        const accessToken = req.cookies.accessToken

        if (!accessToken) {
           return res.status(400).json({ error: "accessToken not found" })
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)

        const user = await User.findById({ _id: decoded.userId })

        if (!user) {
            return res.status(400).json({ message: "user not found"})
        }
        req.user = user
        next()

    } catch (error) {
        console.log("Error in protutedRoute", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const adminRoute = (req, res, next) => {

    try {

        if (req.user && req.user.role === "admin") {
          return  next()
        }

        next()
    } catch (error) {
        console.log("Error in protutedRoute", error.message);
        res.status(500).json({ message: "access denied admin only" })
    }

}