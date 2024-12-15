
import { useEffect, useState } from "react"
import DashBordContent from "../components/DashBordContent"
import AdminProducts from "../components/AdminProducts"
import AdminUsers from "../components/AdminUsers"
import AdminOrders from "../components/AdminOrders"
import useAdminDasboardStore from "../store/adminD.store"
import useAuthStore from "../store/auth.store"

const AdminPage = () => {


    const { getUserCount, getOrderCount, getProductCount, getSalesData } = useAdminDasboardStore()
    const { user } = useAuthStore()

    useEffect(() => {
        if (user) {
            getUserCount()
            getOrderCount()
            getProductCount()
            getSalesData()
        }
    }, [])



    const adminSideBarData = [
        {
            name: "Overview",
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#888888" d="M16 19v-4.808h3V19zm-5.5 0V5h3v14zM5 19V9.808h3V19z"></path></svg>
        },
        {
            name: "Products",
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="#888888" strokeLinejoin="round" strokeWidth="4"><path d="M44 14L24 4L4 14v20l20 10l20-10z"></path><path strokeLinecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19"></path></g></svg>
        },
        {
            name: "Users",
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="#888888" fillRule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m-1.5 8a4 4 0 0 0-4 4a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2a4 4 0 0 0-4-4zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293a3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2a4 4 0 0 0-4-4h-1.1a5.5 5.5 0 0 1-.471.762A6 6 0 0 1 19.5 18M4 7.5a3.5 3.5 0 0 1 5.477-2.889a5.5 5.5 0 0 0-2.796 6.293A3.5 3.5 0 0 1 4 7.5M7.1 12H6a4 4 0 0 0-4 4a2 2 0 0 0 2 2h.5a6 6 0 0 1 3.071-5.238A5.5 5.5 0 0 1 7.1 12" clipRule="evenodd"></path></svg>
        },
        {
            name: "Orders",
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="#888888" fillRule="evenodd" d="M5.5 1a.5.5 0 0 0-.477.65l.11.35H3.5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-1.632l.11-.35A.5.5 0 0 0 10.5 1zm.68 1h3.64l-.313 1H6.493zM11 7H5V6h6zm0 2.5H5v-1h6zM5 12h4v-1H5z" clipRule="evenodd"></path></svg>
        },
        {
            name: "Settings",
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" stroke="#888888" strokeWidth="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.62 1.62 0 0 1-.79 1.353a1.62 1.62 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 1.361s-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.62 1.62 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.62 1.62 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453s.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.62 1.62 0 0 1 19.562 12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.62 1.62 0 0 1-1.566-.008a1.62 1.62 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"></path></g></svg>
        }
    ]

    const [sidebarValue, setSideBarValue] = useState("Overview")

    return (
        <div>
            <div>
                {/* 02.admin side bar here */}

                < div className=" bg-white flex-grow max-w-[250px] space-y-9 p-2 pt-12 mr-10 fixed top-[92px] w-[250px] h-full">
                    {
                        adminSideBarData.map(({ name, svg }, index) => (
                            <div onClick={() => setSideBarValue(name)} key={index} className={` ${name == sidebarValue ? " bg-slate-300" : ""} flex items-center space-x-2 p-2 hover:bg-slate-300 cursor-pointer rounded `}>
                                {svg}
                                <span className=" font-semibold text-lg text-slate-600">{name}</span>
                            </div>
                        ))
                    }
                </div>

                {/* 03.content will change on select sidebar */}
                <div className=" pb-10 ml-[300px]">

                    {
                        sidebarValue === "Overview" && < DashBordContent />
                    }
                    {
                        sidebarValue === "Products" && < AdminProducts />
                    }
                    {
                        sidebarValue === "Users" && < AdminUsers />
                    }
                    {
                        sidebarValue === "Orders" && < AdminOrders />
                    }
                </div>
            </div>
        </div >
    )
}

export default AdminPage