import toast from "react-hot-toast";
import { create } from "zustand";



const useProductStore = create((set) => (
    {
        products: [],
        categoryProducts: [],
        oneProduct: [],
        watchList: [],
        cart: [],
        totalPrice: 0,
        loading: false,
        createProduct: async (product) => {
            set({ loading: true })
            try {
                const res = await fetch("/api/products/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(product)
                })

                const data = await res.json()
                if (data.error) {
                    toast.error(data.error)
                } else {

                    set((preState) => {
                        const newPorduucts = [...preState.products, data]
                        set({ products: newPorduucts })
                    })
                }

                toast.success("product created successfully")
            } catch (error) {
                console.log(error.message);
            } finally {
                set({ loading: false })
            }
        },
        getProduct: async () => {
            try {
                const res = await fetch("/api/products/allproducts")
                const data = await res.json()
                // console.log(data);

                if (data.error) {
                    toast.success(data.error)
                } else {

                    set({ products: data })
                }

            } catch (error) {
                console.log(error.message);

            }
        },
        getProductByCategory: async (category) => {

            try {
                const res = await fetch(`/api/products/category/products/${category}`)
                const data = await res.json()
                set({ categoryProducts: data })

            } catch (error) {
                console.log(error.message);
            }

        },
        updateProduct: async ({ name, category, stock, price, description, image }, id) => {
            console.log(id, name, category, stock, price, description, image);

            try {
                const res = await fetch(`/api/products/update/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, category, stock, price, description, image })
                })
                const data = await res.json()
                console.log(data);

            } catch (error) {
                console.log(error.message);

            }

        },
        getOneProduct: async (name) => {

            try {
                const res = await fetch(`/api/products/product/${name}`)
                const data = await res.json()
                console.log(data);
                set({ oneProduct: data.product })
            } catch (error) {
                console.log(error);
            }

        },

        addToWatchlist: async (product) => {

            try {
                const res = await fetch(`/api/products/watchlist/${product.product._id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()
                toast.success(data.message)

                set((prevState) => {
                    const exitingwatchlist = prevState.watchList.find((item) => item._id === product.product._id)

                    const newWatchlist = !exitingwatchlist ? [...prevState.watchList, { ...product.product }] : prevState.watchList.filter((item) => item._id !== product.product._id)
                    return { watchList: newWatchlist }
                })

            } catch (error) {
                console.log(error.message);

            }
        },
        getWatchList: async () => {

            try {
                const res = await fetch("/api/products/watchlistproduct")
                const data = await res.json()

                set({ watchList: data })
            } catch (error) {
                console.log(error);

            }
        },

        addToCart: async (product) => {

            try {
                const res = await fetch(`/api/products/cart`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: product.product._id })
                })
                await res.json()

                set((prevState) => {
                    const exitingItem = prevState.cart.find((item) => item._id === product.product._id)
                    const newCart = exitingItem
                        ?
                        prevState.cart.map((item) => item._id === product.product._id ? { ...item, quantity: item.quantity + 1 } : item)
                        :
                        [...prevState.cart, { ...product.product, quantity: 1 }]

                    return { cart: newCart }
                })

                toast.success('cart added to successfully')

            } catch (error) {
                console.log(error.message);

            }
        },
        getAllCart: async () => {

            try {
                const res = await fetch('/api/products/getallcart')
                const data = await res.json()

                set({ cart: data })
                set({ totalPrice: data.reduce((sum, product) => sum + product.price, 0) })
            } catch (error) {
                console.log(error.message);

            }

        },
        removeFromcart: async (productId) => {
            try {
                const res = await fetch(`/api/products/removeCart/${productId}`, {
                    method: 'PUT',
                    headers: { "Content-Type": 'application/json' }
                })
                await res.json()
                set((preState) => ({ cart: preState.cart.filter((item) => item._id !== productId) }))
            } catch (error) {
                console.log(error);

            }
        },
        changeCartCount: async (product, count) => {
            try {
                const res = await fetch(`/api/products/cart-count-update/${product._id}`, {
                    method: 'PUT',
                    headers: { "Content-Type": 'application/json' },
                    body: JSON.stringify({ count })
                })
                await res.json()

                set((prevState) => {

                    let newCart = [];

                    const exitingCart = prevState.cart.find((item) => item._id === product._id)

                    if (count > 0 && exitingCart) {
                        newCart = prevState.cart.map((item) => item._id === product._id ? { ...item, quantity: count } : item)
                    }
                    if (count === 0) {
                        newCart = prevState.cart.filter((item) => item._id !== product._id)
                    }
                    return { cart: newCart }
                })

            } catch (error) {
                console.log(error);

            }
        }

    }
))

export default useProductStore;