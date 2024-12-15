import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";


export const createProduct = async (req, res) => {
    try {
        const { name, price, category, stock, description, sales } = req.body;
        let { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const isProduct = await Product.findOne({ name });
        if (isProduct) {
            return res.status(400).json({ message: "Hey, you already created this product" });
        }

        // Cloudinary upload with error handling
        let uploaderResponse;
        try {
            uploaderResponse = await cloudinary.uploader.upload(image);
        } catch (uploadError) {
            console.error("Cloudinary upload error:", uploadError.message);
            return res.status(500).json({ message: "Image upload failed" });
        }

        image = uploaderResponse.secure_url;

        const product = await Product.create({
            name,
            price,
            category,
            stock,
            description,
            image,
            sales
        });

        return res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProduct = async (req, res) => {

    const { id } = req.params
    const { name, price, category, stock, description, image, slaes } = req.body
    try {

        let product = await Product.findById({ _id: id })

        if (!product) {
            return res.status(400).json({ message: "product not found" })
        }

        product.name = name || product.name
        product.price = price || product.price
        product.category = category || product.category
        product.stock = stock || product.stock
        product.description = description || product.description
        product.image = image || product.image
        product.slaes = slaes || product.slaes

        await product.save()

        res.status(200).json({ message: "product updated successfully", product })


    } catch (error) {
        console.log("Error in updateProduct", error.message);
        res.status(500).json({ message: "Internal server error" })

    }

}

export const deleteProduct = async (req, res) => {

    const { id } = req.params.id
    try {

        await Product.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "product deleted successfully" })

    } catch (error) {
        console.log("Error in deleteProduct", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find()

        if (!products) {
            return res.status(400).json({ error: "products not found" })
        } else {
            res.status(200).json(products)
        }

    } catch (error) {
        console.log("Error in getAllProducts", error.message);
        res.status(500).json({ error: "Internal server error" })
    }

}

export const getAllProductsByCategory = async (req, res) => {

    const { category } = req.params
    try {
        const product = await Product.find({ category: category })

        if (!product) {
            return res.status(400).json({ message: "products not found" })
        }

        res.status(200).json(product)

    } catch (error) {
        console.log("Error in getAllProductsByCategory", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const getOneProduct = async (req, res) => {

    const { name } = req.params
    try {
        const product = await Product.findOne({ name: name })

        if (!product) {
            return res.status(400).json({ message: "product not found" })
        }

        res.status(200).json({ product })

    } catch (error) {
        console.log("Error in getOneProduct", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

export const addToWatchList = async (req, res) => {

    const { id } = req.params;
    const loginUserId = req.user._id
    try {

        const loginUser = await User.findById({ _id: loginUserId })

        if (!loginUser) {

            return res.status(400).json({ message: "login before add to watchlist" })

        }

        const product = await Product.findById({ _id: id })

        if (!product) {

            return res.status(400).json({ message: "product not found" })

        }

        const bool = loginUser.watchList.includes(product._id)

        if (bool) {

            const fillteredProductId = loginUser.watchList.filter((element) => element.toString() !== product._id.toString())
            loginUser.watchList = fillteredProductId
            await loginUser.save()
            return res.status(200).json({ message: "Remove from watchlist", watchList: loginUser.watchList })

        } else {

            loginUser.watchList.push(product._id)
            await loginUser.save()
            return res.status(200).json({ message: "Added to watchList", watchList: loginUser.watchList })
        }

    } catch (error) {
        console.log("Error in addToWatchList", error);
        res.status(500).json({ message: "Internal server error" })
    }

}


export const getAllWatchlist = async (req, res) => {

    const userId = req.user._id
    try {

        const user = await User.findById(userId).populate("watchList")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        res.status(200).json(user.watchList)

    } catch (error) {
        console.log("Error in getAllWatchlist", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

// add to cart 
export const addToCart = async (req, res) => {

    const user = req.user;
    const { id } = req.body;

    try {

        const exitingItem = user.cartItems.find((item) => item._id == id)

        if (exitingItem) {
            exitingItem.quantity = exitingItem.quantity + 1
        } else {
            user.cartItems.push(id)
        }

        await user.save()

        res.status(200).json(user.cartItems)
    } catch (error) {
        console.log('Error in addToCart');
        res.status(500).json({ error: 'Internal server error' })
    }

}

// get all cart
export const getAllCart = async (req, res) => {

    const user = req.user

    try {

        const products = await Product.find({ _id: { $in: user.cartItems } })

        const cartItems = products.map((product) => {
            const item = user.cartItems.find(item => item._id.toString() === product._id.toString())

            return { ...product.toJSON(), quantity: item.quantity }
        })

        res.status(200).json(cartItems)

    } catch (error) {
        console.log("Error in getAllCart", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

// remove from  cart
export const removeFromCart = async (req, res) => {

    const user = req.user
    const { id } = req.params

    try {

        const product = await Product.findById(id)

        const filteredProduct = user.cartItems.filter((item) => item._id.toString() !== product._id.toString())

        user.cartItems = filteredProduct

        await user.save()

        res.status(200).json(user.cartItems)

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
        console.log('Error in removeFromCart', error.message);

    }
}

// cart count change
export const changeCartCount = async (req, res) => {

    const user = req.user
    const { id } = req.params
    const { count } = req.body

    try {


        const exitingItem = user.cartItems.find((item) => item._id.toString() === id)

        if (exitingItem) {
            if (count === 0) {
                user.cartItems = user.cartItems.filter((item) => item._id.toString() !== id)
            }
            if (count > 0) {
                exitingItem.quantity = count
            }

            await user.save()

            return res.status(200).json('count changed')
        } else {
            return res.status(400).json({ error: "Item not found" })
        }

    } catch (error) {
        console.log('Error in changeCartCount', error.message);
        res.status(500).json({ error: 'Internal server error' })

    }

}


export const getProductoCunt = async (req, res) => {

    try {
        const products = await Product.find()
        res.status(200).json(products.length)
    } catch (error) {
        console.log('Error in getProductoCunt', error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}

