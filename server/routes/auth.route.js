import express from "express"
import { singUp, logIn, logOut, refreshTokens, updateProfile, getUserProfile, accountDetailes, updateAddress, getAllUsers, getUserCount, getAddress } from "../controllers/auth.controller.js"
import { adminRoute, protuctedRoute } from "../middleware/auth.middleware.js"

const authRoute = express.Router()

authRoute.post('/singup', singUp,)
authRoute.post('/login', logIn)
authRoute.get('/logout', logOut)
authRoute.get('/refresh-token', refreshTokens)
authRoute.put('/updateprofile', protuctedRoute, updateProfile)
authRoute.get('/userprofile', protuctedRoute, getUserProfile)
authRoute.get('/acoountdetailes', protuctedRoute, accountDetailes)
authRoute.put('/updateaddress', protuctedRoute, updateAddress)
authRoute.get('/all-users', protuctedRoute, adminRoute, getAllUsers)
authRoute.get('/user-count', protuctedRoute, adminRoute, getUserCount)
authRoute.get('/address',protuctedRoute,getAddress)


export default authRoute