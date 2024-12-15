import express from "express";
import { adminRoute, protuctedRoute } from "../middleware/auth.middleware.js";
import {
    addToCart,
    addToWatchList,
    changeCartCount,
    createProduct,
    deleteProduct,
    getAllCart,
    getAllProducts,
    getAllProductsByCategory,
    getAllWatchlist,
    getOneProduct,
    getProductoCunt,
    removeFromCart,
    updateProduct
} from "../controllers/product.controller.js";


const productRoute = express.Router()

productRoute.get("/product/:name", protuctedRoute, adminRoute, getOneProduct)
productRoute.get("/allproducts", getAllProducts)
productRoute.get("/category/products/:category", getAllProductsByCategory)
productRoute.post("/create", protuctedRoute, adminRoute, createProduct)
productRoute.put("/update/:id", protuctedRoute, adminRoute, updateProduct)
productRoute.delete("/delete/:id", protuctedRoute, adminRoute, deleteProduct)
productRoute.post('/watchlist/:id', protuctedRoute, addToWatchList)
productRoute.get('/watchlistproduct', protuctedRoute, getAllWatchlist)
productRoute.post('/cart', protuctedRoute, addToCart)
productRoute.put('/removeCart/:id', protuctedRoute, removeFromCart)
productRoute.put('/cart-count-update/:id', protuctedRoute, changeCartCount)
productRoute.get('/getallcart', protuctedRoute, getAllCart)
productRoute.get('/product-count', protuctedRoute, adminRoute, getProductoCunt)

export default productRoute;