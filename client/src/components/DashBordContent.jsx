import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import AdminTopCart from "./AdminTopCart";
import useAdminDasboardStore from "../store/adminD.store";
import { motion } from "framer-motion";

const DashBordContent = () => {

    const { totalUsers, totalProduct, totalOrder, data } = useAdminDasboardStore()

    console.log(data);


    return (

        <div className=" mr-[128px]">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}


            >
                <div className=" flex space-x-20 items-center pt-5">
                    <AdminTopCart color={"bg-pink-300"} title={"Total Orders"} data={totalOrder} svg={<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M7 17h2v-7H7zm4 0h2V7h-2zm4 0h2v-4h-2zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"></path></svg>} />
                    <AdminTopCart color={"bg-cyan-300"} title={"New Users"} data={totalUsers} svg={<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"></path></svg>} />
                    <AdminTopCart color={"bg-violet-300"} title={"Total Products"} data={totalProduct} svg={<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="#888888" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4zm10 2V1h2v5zm0 3.5v-2h2v2z"></path></svg>} />

                </div>

                {/* charts here */}
                <div className=" rounded-lg mt-10 mb-1 mr bg-white w-[920px]">
                    <h1 className=" font-bold text-xl pt-5 pb-5 pl-14">Total Sales</h1>
                    <div className=" w-[100%] h-[400px]  ">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                className=" stroke-amber-200"
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line className=" stroke-teal-500" type="monotone" dataKey="Rs" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
        </div>

    )
}

export default DashBordContent