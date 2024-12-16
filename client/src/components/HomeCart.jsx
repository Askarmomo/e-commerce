
import { Link } from "react-router-dom"
import useProductStore from "../store/product.store"
import useAuthStore from "../store/auth.store"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

const CartItem = (product) => {


    const { watchList } = useProductStore()
    const { user } = useAuthStore()
    const exitingWatchList = watchList.find((item) => item._id === product.product._id)




    const { addToWatchlist, addToCart } = useProductStore()

    const addtowatchlist = () => {
        if (user) {

            return addToWatchlist(product)
        } else {
            toast.error('You Can Not Add To Watchlist Login')
        }

    }

    const addToCartFunc = () => {
        if (user) {
            return addToCart(product)

        } else {
            toast.error('You Can Not Add To Cart Login')
        }
    }



    return (
        <motion.div

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-[200px] sm:max-w-[260px]"
        >

            <div >
                <div className="bg-white hover:shadow-xl p-2 rounded ">
                    <div className=" relative">
                        <Link to={`/book/${encodeURIComponent(product.product.name)}`}>
                            <img className=" sm:h-[250px] h-[180px] w-[250px] object-cover" src={product.product.image} alt="rich dad poor dad" />
                        </Link>
                        {
                            exitingWatchList ?
                                <svg onClick={addtowatchlist} className=" absolute top-1 right-1 fill-slate-600 hover:fill-red-500 hover:bg-white rounded bg-slate-100 bg-opacity-60 transition-all duration-200 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M17.825 9L15 6.175l1.4-1.425l1.425 1.425l3.525-3.55l1.425 1.425zM5 21V5q0-.825.588-1.412T7 3h6v2H7v12.95l5-2.15l5 2.15V11h2v10l-7-3zM7 5h6z"></path></svg>
                                :
                                <svg onClick={addtowatchlist} className=" absolute top-1 right-1 fill-slate-600 hover:fill-teal-500 hover:bg-white rounded bg-slate-100 bg-opacity-60 transition-all duration-200 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M5 21V5q0-.825.588-1.412T7 3h6v2H7v12.95l5-2.15l5 2.15V11h2v10l-7-3zM7 5h6zm10 4V7h-2V5h2V3h2v2h2v2h-2v2z"></path></svg>
                        }
                    </div>
                    <Link to={`/book/${product.product.name}`}>
                        <h3 className="font-semibold sm:text-base text-sm capitalize">{product.product.name.substring(0, 19,) + "..."}</h3>
                        <div className="py-2 text-xs sm:text-base "><span>{product.product.description.substring(0, 71)}</span></div>
                    </Link>
                    <span className=" font-bold sm:text-xl text-teal-700">Rs. {product.product.price}</span>
                    <div className="pt-2">
                        <button onClick={addToCartFunc} className="bg-teal-500 hover:bg-teal-600 rounded sm:p-2 p-1 w-full text-white text-sm sm:text-base font-semibold ">ADD TO CART</button>
                    </div>
                </div>
            </div >
        </motion.div>
    )
}

export default CartItem