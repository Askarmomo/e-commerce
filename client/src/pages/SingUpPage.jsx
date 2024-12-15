import { Link } from "react-router-dom"
import useAuthStore from "../store/auth.store"
import { useState } from "react"
import toast from "react-hot-toast"


const SingUpPage = () => {

    const { singup } = useAuthStore()

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const singupFunc = async () => {
        if (user.username && user.email && user.password) {
            await singup(user)

        } else {
            toast.error('fill all the field')
        }
    }

    return (
        <div className=" mx-5 sm:mx-0 sm:pt-0 pt-[75px]  ">
            <h1 className=" font-bold text-3xl text-center pt-10">SingUp</h1>

            <div className=" max-w-xl mx-auto mt-10 space-y-6 shadow-lg bg-white p-4 pt-5 rounded">

                <label className=" bg-slate-200 p-2 rounded flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" className=" bg-transparent w-full outline-none placeholder:text-slate-800" placeholder="Username" />
                </label>

                <label className=" bg-slate-200 p-2 rounded flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" className=" bg-transparent w-full outline-none placeholder:text-slate-800" placeholder="Email" />
                </label>

                <label className=" bg-slate-200 p-2 rounded flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" className=" bg-transparent w-full outline-none placeholder:text-slate-800" placeholder="* * * * * * * *" />
                </label>

                <button onClick={singupFunc} className=" p-2 rounded bg-teal-400 hover:bg-teal-500 font-semibold w-full">SingUp</button>

                <div className=" pt-1">
                    <p>If you have an acount ? <Link to={"/login"} className=" font-bold underline text-cyan-600"> Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SingUpPage