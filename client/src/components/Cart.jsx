
import { loadStripe } from "@stripe/stripe-js"
import useProductStore from "../store/product.store"
import useAuthStore from "../store/auth.store"
import toast from "react-hot-toast"
import { useState } from "react"



const Cart = () => {



    const { cart, removeFromcart, changeCartCount,totalPrice } = useProductStore()
    const { user } = useAuthStore()
    const [loading, setLoading] = useState(false)

    const makePayment = async () => {
        setLoading(true)
        if (user.address.address) {
            const stripe = await loadStripe("pk_test_51Q29c5P2mvwpfC4m6BXUwk0ZamkHemashuuml6px76WeUYcYovRMESwXZKfNL89JVzYJC0T6Coiysj9BeAAo7dNU00gIYdgS2H")

            try {

                const res = await fetch('/api/orders/create-payment-intent', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(cart)
                })

                const session = await res.json()

                const result = stripe.redirectToCheckout({
                    sessionId: session.id
                })

                if (result.error) {
                    console.log(result.error);
                }
                // create order function here

            } catch (error) {
                console.log(error.message);
            }
        } else {
            toast('Update The Address', {
                icon: '⚠️'
            })
        }
        setLoading(false)

    }



    return (
        <div className=" sm:flex sm:space-x-10 px-5 space-y-5 sm:space-y-0 pb-10">
            <div className=" space-y-4">
                {
                    cart.map((product) => (
                        < div key={product._id} className=" bg-white shadow-xl flex items-center justify-between sm:space-x-10 sm:w-[729px] h-fit rounded p-1 pr-4">
                            <div className=" flex items-center pr-4">
                                <div className=" fill-red-500 mr-2">
                                    <svg onClick={() => removeFromcart(product._id)} className=" fill-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path></svg>
                                </div>
                                <img className=" pr-4 sm:w-40 w-[75px] sm:h-28 h-[75px] object-cover" src={product.image} alt={product.name} />
                                <h1 className=" capitalize text-sm sm:text-base">{product.name}</h1>
                            </div>
                            <div className=" flex items-center">
                                <div className=" pr-4 flex items-center sm:space-x-10 space-y-2 text-center">
                                    <div>
                                        <span className=" text-teal-500 text-sm sm:text-base pr-2">Rs.{product.price}</span>
                                    </div>
                                    <div className=" flex text-sm sm:text-base space-x-2 pr-2 justify-center">
                                        <div><button><svg onClick={() => changeCartCount(product, product.quantity - 1)} className=" bg-red-500 fill-white rounded-full" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="M19 12.998H5v-2h14z"></path></svg></button> </div>
                                        <p>{product.quantity}</p>
                                        <div><button><svg onClick={() => changeCartCount(product, product.quantity + 1)} className=" bg-green-500 fill-white rounded-full" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"></path></svg></button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                cart.length > 0 ? < div className=" space-y-10">

                    <div>
                        <h1 className=" text-slate-700 mb-3 border-b-2 font-semibold ">CART TOTAL</h1>
                        <div className=" bg-white text-sm sm:text-base sm:p-4 p-3 sm:pt-6 rounded sm:w-[500px] shadow-xl">
                            <div className=" sm:space-y-3 space-y-1 sm:mb-5 mb-2">
                                <div className=" flex justify-between">
                                    <p className=" text-slate-600 uppercase ">Subtotal</p>
                                    <span className=" text-teal-600 font-bold ">Rs. {totalPrice || 0}</span>
                                </div>
                                <div className=" flex justify-between space-x-8">
                                    <p className="  text-slate-600 uppercase ">Shipping</p>
                                    <span className=" capitalize text-[15px] font-bold "> <span className=" text-rose-500">Rs.350/</span></span>
                                </div>
                                <div className=" flex justify-between">
                                    <p className=" text-slate-600 uppercase">Subtotal</p>
                                    <span className=" text-teal-600 font-bold">Rs. {totalPrice + 350 || 0}</span>
                                </div>
                            </div>
                            <button onClick={makePayment} className=" p-1.5 rounded font-semibold bg-teal-400 hover:bg-teal-500 w-full text-white">{loading ? 'LOADING...' : 'PROCEED TO CHECKOUT'}</button>
                        </div>
                    </div>

                    <div className=" text-sm sm:text-base">
                        <h1 className=" text-slate-700 mb-3 border-b-2 font-semibold">CUPON</h1>
                        <div className=" bg-white sm:p-4 p-3 sm:pt-6 space-y-4 rounded shadow-xl">

                            <div>
                                <input type="text" placeholder="EX:- EDJWIOON" className=" p-1.5 rounded w-full bg-slate-200 outline-none" />
                            </div>
                            <button className=" p-1.5 rounded font-semibold bg-teal-400 hover:bg-teal-500 w-full text-white">APPLY COUPON</button>
                        </div>
                    </div>

                </div>
                    :
                    <div className=" sm:px-[514px] sm:pt-40 text-center space-y-4">
                        <span className=" capitalize text-3xl font-semibold">Don&apos;t have cart</span>
                        <div> <a href="/" className=" bg-teal-500 p-2 rounded font-semibold text-white">Add to cart</a></div>
                    </div>
            }
        </div >


    )
}

export default Cart