import express from "express"
import { checkoutSuccess, createPaymentIntent, deleteOrder, getAllOrders, getOrderByStatus, getOrdersCount, getSalesData, updateOrder, userOrders } from "../controllers/order.controller.js"
import { adminRoute, protuctedRoute } from "../middleware/auth.middleware.js"

const OrderRoute = express.Router()

OrderRoute.post("/create-payment-intent", protuctedRoute, createPaymentIntent) // create payment
OrderRoute.post('/checkout-success', protuctedRoute, checkoutSuccess) // check payment and create product
OrderRoute.get("/allOrders", protuctedRoute, adminRoute, getAllOrders)
OrderRoute.get("/userorders", protuctedRoute, userOrders)
OrderRoute.put("/update-order/:orderId", protuctedRoute, adminRoute, updateOrder)
OrderRoute.get('/order-count', protuctedRoute, adminRoute, getOrdersCount)
OrderRoute.get('/sales-data', protuctedRoute, adminRoute, getSalesData)
OrderRoute.get('/orders-by-status',protuctedRoute,adminRoute,getOrderByStatus)
OrderRoute.delete('/delete/:id',protuctedRoute,deleteOrder)

export default OrderRoute;