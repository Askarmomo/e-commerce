/* eslint-disable */
import { useEffect, useState } from "react";
import useProductStore from "../store/product.store";
import HomeCart from "../components/HomeCart"



const Book = ({ product }) => {

    const { addToCart, cart, removeFromcart, products } = useProductStore()
    const [more, setMore] = useState(160)

    const exitingCart = cart.find((item) => item._id === product._id)

    const relatedBook = products.filter((item) => item.category === product.category && item._id !== product._id)

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 })
    }, [])

    return (
        <div>
            < div data-aos="zoom-in" key={product.name} className=" mb-10 sm:mt-10 mt-20 flex sm:space-x-8 space-x-4 bg-white p-2 rounded" >
                <img className=" sm:w-[350px] w-[100px] sm:h-[350px] h-[100px] rounded object-cover" src={product.image} alt={product.name} />
                <div className=" space-y-4">
                    <h3 className=" font-bold sm:text-3xl text-sm text-slate-600 uppercase">{product.name}</h3>
                    <p className=" font-bold sm:text-2xl text-sm font-poppins">Rs. {product.price}</p>
                    <div>
                        {
                            exitingCart !== 'undefined' && exitingCart?._id === product?._id ?
                                <button onClick={() => removeFromcart(product._id)} className=" text-white bg-rose-500 p-1 sm:p-2 rounded uppercase sm:font-semibold sm:px-8 hover:bg-rose-600">reove from cart</button>
                                :
                                <button onClick={() => addToCart({ product }, product.quantity + 1)} className=" text-white bg-teal-500 p-1 sm:text-base text-sm sm:p-2 rounded uppercase sm:font-semibold sm:px-8 hover:bg-teal-600">add to cart</button>
                        }
                    </div>
                    <hr />
                    <p className=" text-slate-500 sm:text-base text-xs">{product.description && product.description.substring(0, more)}</p>
                    {
                        more <= 160 ?
                            < span > <button onClick={() => setMore(500)} className=" text-teal-500 sm:text-base text-xs underline">MORE...</button></span>
                            :
                            < span > <button onClick={() => setMore(160)} className=" text-teal-500 sm:text-base text-xs underline">SRING...</button></span>
                    }
                </div>
            </div>

            {relatedBook.length >= 0 && <div><h2 className=" uppercase text-slate-700 font-bold text-2xl">related books</h2>

                <div className=" grid sm:grid-cols-4 grid-cols-2 gap-4 pt-10">
                    {
                        relatedBook.map((product) => (

                            < HomeCart key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
            }
        </div >
    )
}

export default Book