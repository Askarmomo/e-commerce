import { dataFormat } from "../../client/src/middleware/dataFormaet.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe"
import nodemailer from "nodemailer"

const stripe = new Stripe("sk_test_51Q29c5P2mvwpfC4mpo5Yuu4kOw1QMBrBHiLDDCHf5XQa7BApncYrjeRsAyEdUF4tjOvOzhmclFolPt55lpiMRyRR00Az4nMAHf")

export const createPaymentIntent = async (req, res) => {

    const cart = req.body
    const userId = req.user._id

    try {

        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ message: "Invalid or emty product array" })
        }

        const user = await User.findById(userId)

        let status;
        let name;

        const line_items = cart.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.image]
                },
                unit_amount: Math.round(product.price * 100 /300),
            },
            quantity: product.quantity || 1

        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `https://e-commerce-2gbq.onrender.com/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://e-commerce-2gbq.onrender.com//cancel`,

            metadata: {
                userId: user._id.toString(),
                product: JSON.stringify(
                    cart.map((product) => ((
                        status = product.status,
                        {
                            name: product.name,
                            image: product.image,
                            quantity: product.quantity,
                            status: product.status,
                            address: product.address,
                            totalPrice: product.price
                        }
                    )))
                ),
                status,
                name
            }
        })

        if (session.id) {

            return res.status(200).json({ id: session.id })
        }
    } catch (error) {
        console.log("Error in createPaymentIntent", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const checkoutSuccess = async (req, res) => {

    try {

        const { sessionId } = req.body;
        const userAddress = req.user.address.address

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === "paid") {

            const product = JSON.parse(session.metadata.product)

            const order = new Order({
                orderId: Date.now().toString().slice(-6),
                userId: session.metadata.userId,
                products: product.map((product) => ({
                    name: product.name,
                    image: product.image,
                    quantity: product.quantity,
                    status: "Process",
                    address: userAddress,
                    price: product.totalPrice
                })),
                totalPrice: session.amount_total / 100,
                sessionId,
                status: session.metadata.status
            })
            await order.save()
        }

        // send email to customer for purchesing
        const sendedEmail = await sendEmail('askarmomo111@gmail.com', 'Order', "orderd successfully and thnk you for your purchese")

        res.status(200).json({ message: "payment sucessfully" })
    } catch (error) {
        console.log("Error in checkoutSuccess", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const getAllOrders = async (req, res) => {

    const adminId = req.user._id

    try {

        const admin = await User.findOne({ _id: adminId, role: "admin" })


        if (!admin) {
            return res.status(400).json({ message: "admin can only access this" })
        }

        const allOrders = await Order.find().populate('userId')

        const orders = allOrders.map((product) => ({
            orderId: product.orderId,
            createdAt: product.createdAt,
            products: product.products,
            sessionId: product.sessionId,
            status: product.status,
            totalPrice: product.totalPrice,
            username: product.userId.username,
            _id: product._id

        }))

        if (allOrders) {
            res.status(200).json(orders)
        }

    } catch (error) {
        console.log("Error in getAllOrders", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const userOrders = async (req, res) => {

    const userId = req.user._id
    try {

        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        const order = await Order.find({ userId: userId })

        if (!order) {
            return res.status(400).json({ message: "order not found" })
        }

        res.status(200).json(order)

    } catch (error) {
        console.log("Error in userOrders", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const updateOrder = async (req, res) => {

    const { orderId } = req.params
    const { orderStatus } = req.body

    try {

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(400).json({ message: "order not found" })
        }

        order.status = orderStatus
        await order.save()

        res.status(200).json("Order updated successfully")

    } catch (error) {
        console.log("Error in updateOrder", error.message);
        res.status(500).json({ message: "Internal server error" })

    }
}

export const getOrdersCount = async (req, res) => {

    try {
        const orders = await Order.find()
        res.status(200).json(orders.length)
    } catch (error) {
        console.log("Error in getOrdersCount", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const getSalesData = async (req, res) => {

    try {

        const salesData = await Order.find()
        let total = 0

        const data = salesData.map((data) => (
            {
                date: dataFormat(data.createdAt, 'DD/MMM'),
                Rs: parseInt(data.totalPrice)
            }
        ))


        data.unshift({
            date: "jan/21",
            Rs: 10,
        },)

        const final = data.map((data) => {
            total += data.Rs
            return data.Rs = total

        })

        res.status(200).json(data)
    } catch (error) {
        console.log("Error in getSalesData", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const getOrderByStatus = async (req, res) => {

    try {

        // ["Process", "Delivered", "Shiped", "Pending"
        const orders = await Order.find()

        const Process = orders.filter((item) => item.status === 'Process')
        const Delivered = orders.filter((item) => item.status === 'Delivered')
        const Shiped = orders.filter((item) => item.status === 'Shiped')
        const Pending = orders.filter((item) => item.status === 'Pending')

        res.status(200).json({ Delivered: Delivered.length, Pending: Pending.length, Process: Process.length, Shiped: Shiped.length })
    } catch (error) {
        console.log('Error in getOrderbyStatus', error.message);
        res.status(500).json({ error: 'internal server error' })
    }

}

const sendEmail = async (to, subject, text) => {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "askarmomo70@gmail.com",
                pass: "inji oicz cguk mhrq"
            }
        })

        const mailOptions = {
            from: "askarmomo70@gmail.com",
            to,
            subject,
            text
        }

        const info = await transporter.sendMail(mailOptions)

        return info
    } catch (error) {
        console.log(error.message);

    }

}

export const deleteOrder = async (req, res) => {

    const orderId = req.params.id

    try {

        const deletedOrder = await Order.findByIdAndDelete(orderId)

        if (deletedOrder) {
            return res.status(200).json({ message: "order deleted successfully" })
        }

    } catch (error) {
        console.log('Error in deleteOrder', error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}