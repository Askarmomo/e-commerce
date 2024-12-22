import { useEffect, useState } from "react"
import AdminTopCart from "./AdminTopCart"
import useOrderStore from "../store/order.store"
import AdminOrderTr from "./AdminOrderTr"
import { motion } from "framer-motion"

const AdminOrders = () => {

    const { orders, getAllOrders, ordersCount } = useOrderStore()

    useEffect(() => {
        getAllOrders()
    }, [getAllOrders])

    const [search, setSearch] = useState()
    const filteredOrdersById = search ? orders.filter((item) => item.orderId.toString().includes(search)) : orders

    return (
        <div className="p-[22px] sm:p-0 sm:pr-7">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className=" w-[1037px]"
            >
                {/* ["Process", "Delivered", "Shiped", "Pending" */}
                <div className=" flex space-x-28 mt-5 items-center">
                    <AdminTopCart fill={'fill-red-500'} color={"bg-white"} title={"Total Order"} data={ordersCount.Process + ordersCount.Delivered + ordersCount.Shiped + ordersCount.Pending} svg={<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="m17.21 9l-4.38-6.56a1 1 0 0 0-.83-.42c-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1c0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1zM9 9l3-4.4L15 9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2"></path></svg>} />
                    <AdminTopCart fill={"fill-pink-500"} color={'bg-white'} title={"Pending Order"} data={ordersCount.Pending} svg={<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-1.6-.6-3.075t-1.725-2.6L12 12V4Q8.65 4 6.325 6.325T4 12t2.325 5.675T12 20"></path></svg>} />
                    <AdminTopCart fill={'fill-teal-500'} color={'bg-white'} title={"Delivered"} data={ordersCount.Delivered} svg={<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><mask id="ipSCheckCorrect0"><g><g stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" clipPath="url(#ipSCheckCorrect1)"><path d="M42 20v19a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h21"></path><path d="m16 20l10 8L41 7"></path></g><defs><clipPath id="ipSCheckCorrect1"><path d="M0 0h48v48H0z"></path></clipPath></defs></g></mask><path d="M0 0h48v48H0z" mask="url(#ipSCheckCorrect0)"></path></svg>} />
                </div>

                <div className="mt-10 sm:rounded-lg shadow-xl">

                    <div className=" pt-3 pr-5 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 border border-b bg-white">
                        <div className=" px-4 font-semibold uppercase">Total : <span className=" text-teal-500">Rs 12,000</span></div>
                        <div className=" px-4 font-semibold uppercase">Orders : <span className=" text-teal-500">{filteredOrdersById.length}</span></div>
                        <div className="relative">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="number" min={1} id="table-search-users" className="block bg-slate-200 outline-none p-2 ps-10 text-sm rounded-lg w-80 " placeholder="Search product" />
                        </div>
                    </div>

                    <div className="w-full text-sm bg-white text-black">
                        <div >
                            {
                                filteredOrdersById.length === 0 ? orders.map((order) => (

                                    <AdminOrderTr key={order._id} order={order} />

                                ))

                                    :
                                    filteredOrdersById.map((order) => (

                                        <AdminOrderTr key={order._id} order={order} />

                                    ))
                            }
                            {/* <AdminEveryOrder /> */}
                        </div>
                    </div>
                </div>
            </motion.div >
        </div>

    )
}

export default AdminOrders