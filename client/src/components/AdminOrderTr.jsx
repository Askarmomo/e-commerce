/* eslint-disable*/

import { useState } from "react"
import useOrderStore from "../store/order.store"
import { dataFormat } from "../middleware/dataFormaet"


const AdminOrderTr = ({ order }) => {

    const [dbClick, setDbClick] = useState(false)
    const [orderStatus, setOrderStatus] = useState()

    const { orders, updateOrders } = useOrderStore()

    const selectUpdate = orders.find((item) => item._id == order._id)

    const color = order.status === "Shiped" && " badge-primary" || order.status === "Delivered" && " badge-success " || order.status === "Process" && " badge-secondary " || order.status === "Pending" && " badge-warning "

    const [accodient, setaccodient] = useState(false)


    return (
        <div>
            <div  className=" border-b sm:py-3 cursor-pointer list-none flex items-center justify-evenly hover:bg-slate-100">

                <li className=" w-20">
                    <span>ID ( {order.orderId} )</span>
                </li>
                <li className=" w-20 capitalize">
                    {order.username || "unknown"}
                </li>
                <li className=" w-20">
                    Rs. {order.totalPrice}
                </li>
                <li className=" w-20">
                    {
                        !dbClick ? <span onDoubleClick={() => setDbClick(selectUpdate._id == order._id && true)} className={`badge ${color}`}>{order.status}</span>
                            :
                            <select onChange={(e) => setOrderStatus(e.target.value)} className=" bg-slate-200 rounded">
                                <option value="Delivered">Delivered</option>
                                <option value="Process">Process</option>
                                <option value="Pending">Pending</option>
                                <option value="Shiped">Shiped</option>
                            </select>

                    }
                </li>
                <li className=" w-20">
                    <span>{dataFormat(order.createdAt, 'YYYY /MM /DD')}</span>
                </li>
                <li >
                    <div className=" flex space-x-10">
                        {
                            !dbClick ?
                                <span onClick={() => setDbClick(selectUpdate._id == order._id && true)} className=" font-semibold text-red-600 underline">Edit</span>
                                :
                                < button onClick={() => { setDbClick(selectUpdate._id == order._id && false); updateOrders(order, orderStatus) }} className=" bg-yellow-700 p-0.5 rounded text-white">Update</button>
                        }
                    </div>
                </li>
                <li>
                    <svg onClick={() => setaccodient(!accodient)} className={`  ${accodient ? 'rotate-180 stroke-red-600' : 'stroke-slate-500'}`} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><circle cx="12" cy="12" r="9"></circle><path d="m15 13l-3-3l-3 3"></path></g></svg>
                </li>
            </div>

            {
                order.products.map((item, index) => (

                    <div key={item._id} className={` overflow-hidden transition-[max-height] duration-500 ease-in-out  ${accodient ? 'max-h-screen' : 'max-h-0'}`}>
                        <div className="p-4 flex justify-between items-center">
                            <div className=" flex space-x-10 items-center justify-center">
                                <span>{index + 1}</span>
                                <img className=" w-20 h-20 rounded object-cover" src={item.image} alt={item.name} />
                                <div>
                                    <h4 className=" font-semibold text-lg capitalize">{item.name}</h4>
                                </div>
                            </div>
                            <div className=" flex space-x-10">
                                <span>Rs. {item.price}</span>
                                <span>QTY : {item.quantity}</span>
                                <span>TOTAL : Rs {item.price * item.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default AdminOrderTr