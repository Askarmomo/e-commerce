import { useState } from "react"
import Order from "../components/Order"
import Address from "../components/Address"
import ProfileSideBar from "../components/ProfileSideBar"
import AccountDetailes from "../components/AccountDetailes"
import WatchList from "../components/WatchList"
import useAuthStore from "../store/auth.store"

const data = [
    {
        id: 1,
        name: "ORDERS",
        icon: <svg className=" h-[24px] w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#888888" d="M15 21q-.825 0-1.412-.587T13 19v-4q0-.825.588-1.412T15 13h4q.825 0 1.413.588T21 15v4q0 .825-.587 1.413T19 21zm0-10q-.825 0-1.412-.587T13 9V5q0-.825.588-1.412T15 3h4q.825 0 1.413.588T21 5v4q0 .825-.587 1.413T19 11zM5 11q-.825 0-1.412-.587T3 9V5q0-.825.588-1.412T5 3h4q.825 0 1.413.588T11 5v4q0 .825-.587 1.413T9 11zm0 10q-.825 0-1.412-.587T3 19v-4q0-.825.588-1.412T5 13h4q.825 0 1.413.588T11 15v4q0 .825-.587 1.413T9 21z"></path></svg>
    },
    {
        id: 2,
        name: "ADDRESS",
        icon: <svg className=" h-[24px] w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#888888" d="M9 13h2v-2.75h2V13h2V8.25l-3-2l-3 2zm3 9q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"></path></svg>
    },
    {
        id: 3,
        name: "ACCOUNT DETAILES",
        icon: <svg className=" h-[24px] w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#888888" d="M5 17v-7h2v7zm6 0v-7h2v7zm-9 4v-2h20v2zm15-4v-7h2v7zM2 8V6l10-5l10 5v2z"></path></svg>
    },
    {
        id: 4,
        name: "WATCH LIST",
        icon: <svg className=" h-[24px] w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#888888" d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"></path></svg>
    },
    {
        id: 5,
        name: "LOGOUT",
        icon: <svg className=" h-[24px] w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#888888" fillRule="evenodd" d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2z"></path></svg>
    },
]


const ProfilePage = () => {

    const { user, logout } = useAuthStore()

    const [select, setSelect] = useState("ORDERS")

    if (select === "LOGOUT") {
        const LogOutFunc = async () => {

            await logout
        }
        LogOutFunc()
    }


    return (
        <div className=" mb-10  mt-[70px] sm:mt-0">
            <div className=" sm:flex sm:space-x-[310px]">

                <div className=" sm:block flex items-cente sm:space-x-0 sm:max-w-fit bg-white sm:p-3 sm:h-full fixed z-50 sm:top-[92px] bottom-0">
                    <div className=" hidden text-center sm:flex sm:items-center sm:space-x-4 sm:mb-5 sm:border-b-2 border-slate-500 sm:pb-2">
                        <img className=" sm:w-20 w-10 sm:h-20 h-10 rounded-full object-cover" src={user.profilePic} alt={user.username} />
                        <span className=" font-semibold text-xl capitalize hidden sm:block">{user.username}</span>
                    </div>

                    <div className=" py-4 flex items-center space-x-[40px] px-4 sm:px-0 justify-evenly sm:justify-normal sm:space-x-0 sm:block sm:space-y-6 sm:rounded ">

                        {
                            data.map((instance) => (

                                <ProfileSideBar key={instance.id} name={instance.name} icon={instance.icon} setSelect={setSelect} select={select} data={data} />
                            ))
                        }

                    </div>
                </div>

                <div className="mt-16 sm:px-[24px]">
                    {
                        select === "ORDERS" && < Order select={select} />
                    }
                    {
                        select === "ADDRESS" && < Address select={select} />
                    }
                    {
                        select === "ACCOUNT DETAILES" && < AccountDetailes select={select} />
                    }
                    {
                        select === "WATCH LIST" && < WatchList select={select} />
                    }
                </div>
            </div>


        </div >
    )
}

export default ProfilePage