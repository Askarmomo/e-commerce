import express from "express"
import authRoute from "./routes/auth.route.js"
import dotenv from "dotenv"
import mongodbConnection from "./lib/db.js"
import cookieParser from "cookie-parser"
import productRoute from "./routes/product.route.js"
import { v2 as cloudinary } from "cloudinary"
import OrderRoute from "./routes/orders.route.js"
import corse from "cors"
import path from 'path'

dotenv.config()
const app = express()
const PORT = 3000

const __dirname = path.resolve()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(express.json({ limit: "10MB" }))
app.use(cookieParser())
app.use(corse({ origin:"https://e-commerce-1-backend-4s5l.onrender.com"}))


app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', OrderRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })

}

app.listen(PORT, () => {
    console.log("server is running http://localhost:" + PORT);
    mongodbConnection()
})
