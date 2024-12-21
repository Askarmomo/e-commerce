import useAuthStore from "../store/auth.store"
import { motion } from "framer-motion"



const AdminUsers = () => {

    const { allUsers, user, deleteUser } = useAuthStore()

    return (

        <div className=" pr-[47px]">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}

                className="mt-10 sm:rounded-lg w-[1000px]">
                <div className=" bg-white px-5 pt-5 rounded-xl shadow-xl">

                    <table className="w-full text-sm">
                        <thead className="text-xs border-b-2">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Roles
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                 user.role == 'admin' && allUsers.map((user) => (

                                    <tr key={user._id} className="bg-white border-b">
                                        <th scope="row" className="flex items-center px-6 py-4 font-medium ">
                                            <img className="w-10 h-10 rounded-full object-cover" src={user.profilePic} alt={user.username} />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold capitalize">{user.username}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className=" badge badge-secondary capitalize">{user.role}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className=" badge badge-accent capitalize"> active</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className=" flex space-x-3">
                                                <svg onClick={() => { confirm('are you want to delete') && deleteUser(user) }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" stroke-rose-500 hover:stroke-red-600 cursor-pointer"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </motion.div >
        </div >

    )
}

export default AdminUsers