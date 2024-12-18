import PropTypes from "prop-types"
import useOrderStore from "../store/order.store"
import { dataFormat } from "../middleware/dataFormaet"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'


const Order = () => {


    const { userOrders, getUserOrder, deleteOrder,loading } = useOrderStore()
    // console.log(userOrders);

    useEffect(() => {
        getUserOrder()

    }, [getUserOrder])

    const [search, setSearch] = useState('')
    const [accodient, setAccodient] = useState(false)
    const [OrderId, setOrderId] = useState()

    const total = userOrders.reduce((preValue, curValue) => preValue + Number(curValue.totalPrice), 0)

    const filteredOrder = search !== 'undefined' ? userOrders.filter((item) => item.orderId.toString().includes(search)) : userOrders

    return (
        <div>
            {

                !loading ?
                    <div className=" mx-3 sm:mx-0 mt-[150px] sm:mt-auto text-xs sm:text-base sm:w-[1008px]">
                        {
                            userOrders.length ?
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 20, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className=" bg-white w-full p-1 rounded">
                                    < div >
                                        <div className=" sm:pt-3 sm:pr-5 flex items-center justify-between sm:justify-normal sm:space-x-40  sm:pb-3 flex-column flex-wrap md:flex-row space-y-4 sm:space-y-0 md:space-y-0 pb-4 border border-b bg-white">
                                            <div className=" px-4 font-semibold uppercase">Total : <span className=" text-teal-500">{total.toLocaleString('en-LK', { style: 'currency', currency: 'LKR' })}</span></div>
                                            <div className=" px-4 font-semibold uppercase">Orders : <span className=" text-teal-500">{filteredOrder.length || userOrders.length}</span></div>
                                            <div className="relative sm:w-0 mx-2 w-full">
                                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" min={1} id="table-search-users" className="block bg-slate-200 outline-none p-2 ps-10 text-sm rounded-lg sm:w-[300px] w-full " placeholder="Search product" />
                                            </div>
                                        </div>

                                        {userOrders && userOrders.length > 0 ?
                                            filteredOrder.length > 0 ?

                                                filteredOrder.map((order) => (
                                                    <div key={order._id} className=" text-xs sm:text-base sm:w-[1000px]">
                                                        <div className={` text-xs list-none sm:text-sm flex bg-slate-100 my-1 cursor-pointer hover:bg-slate-200 items-center justify-evenly sm:px-0 sm:py-2 py-3 ${order._id === OrderId && accodient && 'bg-slate-100'}`}>
                                                            <li className=" sm:w-20 w-[70px] ">ID ({order.orderId})</li>
                                                            <li className="text-teal-500 sm:w-20 w-[75px] ">{Number(order.totalPrice).toLocaleString('en-LK', { style: 'currency', currency: "LKR" })}</li>
                                                            <li className={`sm:w-20 rounded w-[60px] text-center ${order.status === "Shiped" && " badge-primary" || order.status === "Delivered" && " badge-success " || order.status === "Process" && " badge-secondary " || order.status === "Pending" && " badge-warning "}`}>{order.status}</li>
                                                            <li className="sm:w-20">{dataFormat(order.createdAt, 'DD/MM/YYYY')}</li>
                                                            <li className="sm:w-22" onClick={() => { confirm('Are You Want To Delete The Order') && deleteOrder(order) }}><svg className=" fill-rose-500 hover:fill-rose-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"></path></svg></li>
                                                            <li className="sm:w-22" onClick={() => { setOrderId(order._id); setAccodient(!accodient) }}><svg className={` w-6 h-6 bg-slate-200 rounded-full ${order._id === OrderId && accodient ? 'fill-red-500 ' : 'rotate-180 fill-slate-500'} `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className=" animate-pulse" d="M18 6.41L16.59 5L12 9.58L7.41 5L6 6.41l6 6z"></path><path className=" animate-pulse" d="m18 13l-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"></path></svg></li>
                                                        </div>

                                                        {order.products.map((product, index) => (
                                                            <div key={product._id} className={`border sm:border-none capitalize border-b list-none flex sm:block items-center sm:justify-between overflow-hidden transition-[max-height] duration-700 ease-in-out ${order._id === OrderId && accodient ? 'max-h-screen' : 'max-h-0'}`}>
                                                                <div className="  flex sm:items-center space-x-3 sm:justify-between sm:p-2 p-2">
                                                                    <div className="sm:px-6 sm:py-4 flex sm:space-x-4 space-x-2 items-center sm:justify-between" >
                                                                        <span>{index + 1}</span>
                                                                        <img className="h-12 w-12 object-cover rounded-lg " src={product.image} alt={product.name} />
                                                                        <span className=" capitalize w-[100px] text-xs sm:text-base sm:w-auto">{product.name}</span>
                                                                    </div>

                                                                    <div className={` flex items-center sm:justify-end sm:space-x-10 space-x-4 sm:pr-5`}>
                                                                        <li className=" w-[57px] sm:w-auto">{product.address}</li>
                                                                        <li>{product.quantity}</li>
                                                                        <li className=" text-teal-700">{Number(product.price).toLocaleString('en-LK', { style: 'currency', currency: 'LKR' })}</li>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        )}
                                                    </div>
                                                ))
                                                :
                                                userOrders.map((order) => (
                                                    <div key={order._id} className=" text-xs sm:text-base sm:w-[1000px]">
                                                        <div className={` text-xs list-none sm:text-sm flex bg-slate-100 my-1 cursor-pointer hover:bg-slate-200 items-center justify-evenly sm:px-0 sm:py-2 py-3 ${order._id === OrderId && accodient && 'bg-slate-100'}`}>
                                                            <li className=" sm:w-20 w-[70px] ">ID ({order.orderId})</li>
                                                            <li className="text-teal-500 sm:w-20 w-[75px] ">{Number(order.totalPrice).toLocaleString('en-LK', { style: 'currency', currency: "LKR" })}</li>
                                                            <li className={`sm:w-20 rounded w-[60px] text-center ${order.status === "Shiped" && " badge-primary" || order.status === "Delivered" && " badge-success " || order.status === "Process" && " badge-secondary " || order.status === "Pending" && " badge-warning "}`}>{order.status}</li>
                                                            <li className="sm:w-20">{dataFormat(order.createdAt, 'DD/MM/YYYY')}</li>
                                                            <li className="sm:w-22" onClick={() => { confirm('Are You Want To Delete The Order') && deleteOrder(order) }}><svg className=" fill-rose-500 hover:fill-rose-600 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"></path></svg></li>
                                                            <li className="sm:w-22" onClick={() => { setOrderId(order._id); setAccodient(!accodient) }}><svg className={` w-6 h-6 bg-slate-200 rounded-full ${order._id === OrderId && accodient ? 'fill-red-500 ' : 'rotate-180 fill-slate-500'} `} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path className=" animate-pulse" d="M18 6.41L16.59 5L12 9.58L7.41 5L6 6.41l6 6z"></path><path className=" animate-pulse" d="m18 13l-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"></path></svg></li>
                                                        </div>

                                                        {order.products.map((product, index) => (
                                                            <div key={product._id} className={`border sm:border-none capitalize border-b list-none flex sm:block items-center sm:justify-between overflow-hidden transition-[max-height] duration-700 ease-in-out ${order._id === OrderId && accodient ? 'max-h-screen' : 'max-h-0'}`}>
                                                                <div className="  flex sm:items-center space-x-3 sm:justify-between sm:p-2 p-2">
                                                                    <div className="sm:px-6 sm:py-4 flex sm:space-x-4 space-x-2 items-center sm:justify-between" >
                                                                        <span>{index + 1}</span>
                                                                        <img className="h-12 w-12 object-cover rounded-lg " src={product.image} alt={product.name} />
                                                                        <span className=" capitalize w-[100px] text-xs sm:text-base sm:w-auto">{product.name}</span>
                                                                    </div>

                                                                    <div className={` flex items-center sm:justify-end sm:space-x-10 space-x-4 sm:pr-5`}>
                                                                        <li className=" w-[57px]">{product.address}</li>
                                                                        <li>{product.quantity}</li>
                                                                        <li className=" text-teal-700">{Number(product.price).toLocaleString('en-LK', { style: 'currency', currency: 'LKR' })}</li>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                        )}
                                                    </div>
                                                ))
                                            :
                                            <p>No orders available</p>

                                        }

                                    </div>


                                </motion.div >
                                :
                                <div className=" font-semibold text-4xl mt-40 text-center text-slate-500">
                                    <h1 >Don`t have orders</h1>
                                </div>
                        }
                    </div >
                    :
                    <div className=" sm:w-[1008px] text-center mt-[200px] ">
                       <span className="loading loading-bars loading-lg"></span>
                    </div>
            }
        </div>
    )
}

Order.propTypes = {
    select: PropTypes.string
}

export default Order